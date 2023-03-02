// import { ResponseCode } from 'network/ResponseCode';
import ResponseCode from './ResponseCode';
/**
 * helper.js - for storing reusable logic.
 */
import NetInfo from '@react-native-community/netinfo';
import Axios, { AxiosRequestConfig } from 'axios';
import { store } from 'redux/store';

import { Constants } from 'common/Constants';

import strings from 'res/strings';
import { BaseResponse } from './BaseResponse';

import { hideLoading, showLoading } from 'components';
import authSlice from 'redux/slice/authSlice';
import axios from 'axios';

export enum RequestMethod {
  GET,
  POST,
  PUT,
  DELETE,
}
export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS'
}

interface RequestConfig {
  options?: AxiosRequestConfig;
  method?: RequestMethod;
  url?: string | any;
  params?: any;
  isShowLoading?: boolean;
  ignoreURLBase?: boolean;
  ignoreHandleCommonError?: boolean;
  contentType?: string;
  accept?: string;
  sound?:boolean
}

const TIMEOUT = 30 * 1000; // 30 seconds

const axiosInit = Axios.create({
  baseURL: Constants.DOMAIN,
  timeout: TIMEOUT,
});

const { CancelToken } = Axios;

class ApiClient {
  // Map lưu lại những request cần cancel trước khi thực hiện request mới
  mapRequestCancel: Map<string, any> = new Map();

  static instance: any;

  constructor(_instance: any) {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }
    ApiClient.instance = _instance;
  }

  /**
   *
   * @param url Đường dẫn API muốn cancel
   */
  cancelCallApi(url: string) {
    if (this.mapRequestCancel.has(url)) {
      const canceler = this.mapRequestCancel.get(url);
      canceler && canceler();
      this.mapRequestCancel.delete(url);
    }
  }

  /**
   * Main method used to fetch data from service
   * @param method
   * @param url
   * @param contentType
   * 
   * @param params
   * @param options
   * @param isShowLoading
   * @param ignoreURLBase
   *        true nếu đường link không cộng BASE_URL ở đầu, false ngược lại
   * @param ignoreHandleCommonError
   *        true nếu muốn request bỏ qua logic xử lý các mã lỗi chung như 401, 504, ...
   * @returns
   */

  async request<T>({
    method,
    url,
    accept,
    sound,
    contentType,
    options,
    params,
    isShowLoading = true,
    ignoreURLBase = false,
    ignoreHandleCommonError = true,
  }: RequestConfig) {
    isShowLoading && showLoading();
    // const toast = useToast();
    // Checking network connectivity before call API


    const netWorkState = await NetInfo.fetch();
    if (!netWorkState.isConnected) {
      const response: BaseResponse<T> = {
        data: {} as T,
      };
      response.status = ResponseCode.NOT_INTERNET;

      console.log('disconnect')
      return response;
    }


    const requestInterceptor = Axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const configTemp = config;
        configTemp.cancelToken = new CancelToken(cancel => {
          this.mapRequestCancel.set(url ?? options?.url, cancel);
        });
        const token = store.getState().authReducer?.user.accessToken;
        const refresh_token = store.getState().authReducer?.user.refreshToken;
        if (token && token.length > 0) {
          if (!configTemp?.headers) {
            throw new Error(
              "Expected 'config' and 'config.headers' not to be undefined",
            );
          }
          configTemp.headers.Authorization = `Bearer ${token}`;
          configTemp.headers.refresh_token = refresh_token;
        }
        return configTemp;
      },
      err => Promise.reject(err),
    );

    const responseInterceptor = Axios.interceptors.response.use(
      async response => {
        // hideLoading();
        if (response.status) {
          if (
            response.status === ResponseCode.SUCCESS ||
            response.status === ResponseCode.CREATE_SUCCESS
          ) {
            console.log(response)
            hideLoading();
            return response;
          }
          return Promise.reject(response.status);
        }
        return Promise.reject();
      },
      error => {
        if (error.response?.status === ResponseCode.UNAUTHORIZED) {
          store.dispatch(authSlice.actions.logout());
        }
        return Promise.reject(error);
      },
    );

    let request = axios({
      timeout: TIMEOUT,
      headers: {
        'Accept': 'Application/json',
        'Content-Type': 'Application/json',
      }
      ,
      ...options
    });
    return Promise.race([
      request,
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Network timeout'));
        }, TIMEOUT);
      }),
    ])
      .then((res: any) => {
        const response: BaseResponse<T> = {
          data: {} as T,
        };

        hideLoading();
        response.status = res.status;
        response.data = res.data;
        console.log('SUCCESS RESPONSE', res)
        return response;
      })
      .catch(error => {

        console.log(error?.response?.data)
        console.log('apierror ', options?.url);
        const response: BaseResponse<T> = {
          data: {} as T,
        };
        response.status = error?.response?.status;
        response.message = error?.message;
        response.error = error;
        if (
          ignoreHandleCommonError &&
          response.status === ResponseCode.UNAUTHORIZED
        ) {
          response.message = error?.message;
        }

        if (!ignoreHandleCommonError) {
          switch (response.status) {
            case ResponseCode.GATEWAY_TIME_OUT:
              response.message = 'Network timeout';
              break;
            case ResponseCode.UNAUTHORIZED: // Đã có dialog thông báo 401 ở trên
              response.message = '';
              break;
            default:
              // toast.show('error' + response.message);
              break;
          }
        }

        hideLoading();
        return response;
      })
      .finally(() => {
        Axios.interceptors.request.eject(requestInterceptor);
        Axios.interceptors.response.eject(responseInterceptor);
        hideLoading();
      });
  }
}

const Api = new ApiClient(axiosInit);
export default Api;

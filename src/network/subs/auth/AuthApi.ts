import { ApiConstants } from 'network/ApiConstants';
import Api, { RequestMethod, METHOD } from 'network/ApiManager';
import {
  LoginWithEmailParams,
  ChangePassword,
  ForgotPassword,
  RegisterWithEmailParams,
} from './AuthRequest';

export const AuthApis = {
  loginWithEmail: ApiConstants.HOST + 'ext/login',
  changePassword: ApiConstants.HOST + 'ext/users/password',
  forgotPassword: ApiConstants.HOST + 'ext/users/password/forgot',
  getAvatar: ApiConstants.HOST + 'ext/files',
  register : ApiConstants.HOST + 'ext/users/register'
};

class AuthenticationApi {
  loginWithEmail<T>(params: LoginWithEmailParams) {
    return Api.request<T>({
      options: {
        method: METHOD.POST,
        url: AuthApis.loginWithEmail,
        data: JSON.stringify(params),
      },
    });
  }
  registerWithEmail<T>(params: RegisterWithEmailParams) {
    return Api.request<T>({
      options: {
        method: METHOD.POST,
        url: AuthApis.register,
        data: JSON.stringify(params),
      },
    });
  }
  forgotPassword<T>(params: ForgotPassword) {
    // const url = `${AuthApis.forgotPassword}?username=${params.username}`;
    return Api.request<T>({
      options: {
        method: METHOD.PUT,
        url: AuthApis.forgotPassword,
        params: {
          username: params.username,
        },
      },
      ignoreURLBase: true,
    });
  }

  changePassword<T>(params: ChangePassword) {
    const url = AuthApis.changePassword;
    return Api.request<T>({
      options: {
        method: METHOD.PUT,
        url: url,
        data: params
      },
      ignoreURLBase: true,
    });
  }

  getAvatar<T>(params: any) {
    return Api.request<T>({
      options: {
        url: AuthApis.getAvatar,
        method: METHOD.GET,
        params:{
          id:params.id,
          'file-size':'ORIGINAL',
        },
        headers: {
          'Authorization': params?.token
        },
        responseType: 'arraybuffer',
      }
    })
  }
}

export default new AuthenticationApi();

import {useEffect, useReducer} from 'react';

import Api, {RequestMethod} from 'network/ApiManager';
import ResponseCode from 'network/ResponseCode';

interface GetDataParams {
  typeFetch: 'FETCH' | 'REFRESH' | 'LOAD_MORE';
  page: number;
}

interface UseFetchCommonProps {
  url: string;
  isShowLoading?: boolean;
  ignoreHandleCommonError?: boolean;
}

interface ResponseData<T> {
  currentPage: number;
  pageCount: number;
  data: T[];
}

interface LoadingState<T> {
  currentPage: number;
  lastPage: number;
  data: T[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
}

const useFetchCommon = <T>({
  url,
  isShowLoading = true,
  ignoreHandleCommonError = true,
}: UseFetchCommonProps) => {
  const [state, setState] = useReducer(
    (oldState: LoadingState<T>, newState: Partial<LoadingState<T>>) => ({
      ...oldState,
      ...newState,
    }),
    {
      currentPage: 1,
      lastPage: 1,
      data: [],
      isLoading: false,
      isRefreshing: false,
      isLoadingMore: false,
    },
  );

  const handleGetData = async ({typeFetch, page}: GetDataParams) => {
    switch (typeFetch) {
      case 'FETCH':
        setState({isLoading: true});
        break;
      case 'REFRESH':
        setState({isRefreshing: true});
        break;
      case 'LOAD_MORE':
        setState({isLoadingMore: true});
        break;
      default:
        break;
    }
    const response = await Api.request<ResponseData<T>>({
      method: RequestMethod.GET,
      url,
      params: {
        page: page,
        perPage: '10',
      },
      isShowLoading: isShowLoading,
      ignoreHandleCommonError: ignoreHandleCommonError,
    });
    if (response.status !== ResponseCode.SUCCESS) {
    } else {
      if (typeFetch === 'LOAD_MORE') {
        setState({
          currentPage: page,
          lastPage: response.data.pageCount,
          data: [...state.data, ...response.data.data],
        });
      } else {
        setState({
          currentPage: 1,
          lastPage: response.data.pageCount,
          data: response.data.data,
        });
      }
    }
    switch (typeFetch) {
      case 'FETCH':
        setState({isLoading: false});
        break;
      case 'REFRESH':
        setState({isRefreshing: false});
        break;
      case 'LOAD_MORE':
        setState({isLoadingMore: false});
        break;
      default:
        break;
    }
  };

  const handleRefresh = () => {
    if (!state.isRefreshing) {
      handleGetData({typeFetch: 'REFRESH', page: 1});
    }
  };

  const handleLoadMore = () => {
    if (!state.isLoadingMore && state.currentPage < state.lastPage) {
      const nextPage = state.currentPage + 1;
      handleGetData({typeFetch: 'LOAD_MORE', page: nextPage});
    }
  };

  const cancelFetch = () => {
    Api.cancelCallApi(url);
  };

  useEffect(() => {
    handleGetData({typeFetch: 'FETCH', page: 1});
  }, []);

  return {
    isLoading: state.isLoading,
    isRefreshing: state.isRefreshing,
    isLoadingMore: state.isLoadingMore,
    data: state.data,
    handleRefresh,
    handleLoadMore,
    cancelFetch,
  };
};

export {useFetchCommon};

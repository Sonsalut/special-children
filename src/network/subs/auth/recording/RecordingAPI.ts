import { ApiConstants } from 'network/ApiConstants';
import Api, { RequestMethod, METHOD } from 'network/ApiManager';
import {
    GetWordByCateID,
    GetFullCategory
} from './RecordingRequest';

export const AuthApis = {
    GetWordByCateID: ApiConstants.HOST + 'ext/word/search/by-user',
    GetImage : ApiConstants.HOST + 'ext/files/download',
  GetFullCate: ApiConstants.HOST + 'ext/category/search/by-user',
  GetStorageWord : ApiConstants.HOST + 'ext/word/repo'

};

class RecodingApi {
    GetWordByCateID<T>(params: GetWordByCateID) {
        return Api.request<T>({
            options: {
                method: METHOD.POST,
                url: AuthApis.GetWordByCateID,
                data: JSON.stringify(params),
            },
        });
    }
    GetFullCategory<T>(params: GetFullCategory ) {
        return Api.request<T>({
            options: {
                method: METHOD.POST,
                url: AuthApis.GetFullCate,
                data: JSON.stringify(params),
            },
        });
    }
    GetImageByID<T>(params: any) {
        return Api.request<T>({
            options: {
                method: METHOD.GET,
                url: AuthApis.GetImage,
                params: {
                    id: params.id,
                    'file-size': 'small',
                },
            },
        });
    }
    GetStorageWord<T>(params: any) {
        return Api.request<T>({
            options: {
                method: METHOD.GET,
                url: AuthApis.GetStorageWord,
                
            },
        });
    }
    PostStorageWord<T>(params: any) {
        return Api.request<T>({
            options: {
                method: METHOD.GET,
                url: AuthApis.GetStorageWord,
                
            },
        });
    }
    
}
export default new RecodingApi();

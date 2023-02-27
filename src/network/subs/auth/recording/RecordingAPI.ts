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
  GetStorageWord : ApiConstants.HOST + 'ext/word/repo',
  PostStorageWord : ApiConstants.HOST + 'ext/word/repo'


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
   
    GetStorageWord<T>(params: any) {
        return Api.request<T>({
          
            options: {
                method: METHOD.GET,
                url: AuthApis.GetStorageWord,
                
            },
        });
    }
   
    AddWordToStorage<T>(params: any) {
        return Api.request<T>({
            options: {
                method: METHOD.POST,
                url: AuthApis.GetStorageWord,
                data: JSON.stringify(params),
            },
        });
    }
    
}
export default new RecodingApi();

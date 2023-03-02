import { GetStorageWord, GetVoice, VoiceInfor } from 'network/subs/auth/recording/RecordingRequest';
import { ApiConstants } from 'network/ApiConstants';
import Api, { RequestMethod, METHOD } from 'network/ApiManager';
import {
    GetWordByCateID,
    GetFullCategory,
    AddWordToStorage,
    DeleteWordToStorage
} from './RecordingRequest';

export const AuthApis = {
    GetWordByCateID: ApiConstants.HOST + 'ext/word/search/by-user',
    GetImage : ApiConstants.HOST + 'ext/files/download',
  GetFullCate: ApiConstants.HOST + 'ext/category/search/by-user',
  GetStorageWord : ApiConstants.HOST + 'ext/word/repo',
  PostStorageWord : ApiConstants.HOST + 'ext/word/repo' ,
  DeleteStorageWord : ApiConstants.HOST + 'ext/word/repo',
 GetVoiceInfor : ApiConstants.HOST + 'ext/accounts/voices/by-user',
 PostVoiceInfor : ApiConstants.HOST + 'ext/accounts/voices/by-user',
 GetVoice : ApiConstants.HOST + 'ext/files/audio-stream/by-word?words=',






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
   
    GetStorageWord<T>(params: GetStorageWord) {
        return Api.request<T>({
          
            options: {
                method: METHOD.GET,
                url: AuthApis.GetStorageWord,
                
            },
        });
    }
   
    AddWordToStorage<T>(params: AddWordToStorage) {
        return Api.request<T>({
            options: {
                method: METHOD.POST,
                url: AuthApis.DeleteStorageWord+`?wordId=${params.wordId}`,
            },
        });
    }
    DeleteWordToStorage<T>(params: DeleteWordToStorage) {
        return Api.request<T>({

           

            options: {
                method: METHOD.DELETE,
                url: AuthApis.DeleteStorageWord+`?wordId=${params.wordId}`,
                // data: JSON.stringify(params),
            },
        });
    }
    // GetVoice<T>(params: GetVoice) {
    //     return Api.request<T>({
    //         sound:true,
    //         contentType:'application/octet-stream',
    //         options: {
    //             method: METHOD.GET,
    //             url: AuthApis.GetVoice+ `${params.audioWord}`,
    //             // responseType: 'arraybuffer'
    //             responseType: 'blob'
               
    //         },
    //     });
    // }
    GetVoiceInfor<T>(params: any) {
        return Api.request<T>({
      
    
            
            options: {
                method: METHOD.GET,
                url: AuthApis.GetVoiceInfor
                
            },
        });
    }
    PostVoiceInfor<T>(params: VoiceInfor) {
        return Api.request<T>({
            options: {
                method: METHOD.PUT,
                url: AuthApis.GetVoiceInfor,
                data: JSON.stringify(params),
                
            },
        });
    }
    
}
export default new RecodingApi();

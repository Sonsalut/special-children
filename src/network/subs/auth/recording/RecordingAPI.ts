

import { Axios } from 'axios';
import {  AddCategoryForUser, CategoryStatus, DeleteCategory, GetStorageWord, GetVoice, UpdateCategory, UpdateWord, VoiceInfor } from 'network/subs/auth/recording/RecordingRequest';
import { ApiConstants } from 'network/ApiConstants';
import Api, { RequestMethod, METHOD } from 'network/ApiManager';
import {
    GetWordByCateID,
    GetFullCategory,
    AddWordToStorage,
    DeleteWordToStorage
    
} from './RecordingRequest';

export const AuthApis = {
//     GetWordByCateID: ApiConstants.HOST + 'ext/word/search/by-user',
//     GetImage : ApiConstants.HOST + 'ext/files/download',
// //   GetFullCate: ApiConstants.HOST + 'ext/category/search/by-user',
//   GetStorageWord : ApiConstants.HOST + 'ext/word/repo',
//   PostStorageWord : ApiConstants.HOST + 'ext/word/repo' ,
//   DeleteStorageWord : ApiConstants.HOST + 'ext/word/repo',
//  GetVoiceInfor : ApiConstants.HOST + 'ext/accounts/voices/by-user',
//  PostVoiceInfor : ApiConstants.HOST + 'ext/accounts/voices/by-user',
//  GetVoice : ApiConstants.HOST + 'ext/files/audio-stream/by-word?words=',
// SetCateforyStatus: ApiConstants.HOST + 'ext/category/status',
// UpdateCategory: ApiConstants.HOST + 'ext/category',
// UpdateCategory: 'http://192.168.10.35:8089/ext/category'
GetFullCate:  'http://192.168.10.35:8089/ext/user/category/search',
GetWordByCateID: ApiConstants.HOST + 'ext/word/search/by-user',
GetImage : ApiConstants.HOST + 'ext/files/download',
//   GetFullCate: ApiConstants.HOST + 'ext/category/search/by-user',
GetStorageWord : ApiConstants.HOST + 'ext/word/repo',
PostStorageWord : ApiConstants.HOST + 'ext/word/repo' ,
DeleteStorageWord : ApiConstants.HOST + 'ext/word/repo',
UpdateWord : ApiConstants.HOST + 'ext/word/repo',

GetVoiceInfor : ApiConstants.HOST + 'ext/accounts/voices/by-user',
PostVoiceInfor : ApiConstants.HOST + 'ext/accounts/voices/by-user',
GetVoice : ApiConstants.HOST + 'ext/files/audio-stream/by-word?words=',
SetCateforyStatus: ApiConstants.HOST + 'ext/category/status',
UpdateCategory: ApiConstants.HOST + 'ext/user/category/',
AddCategory: ApiConstants.HOST + 'ext/user/category/',




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
    SetStatusCategory<T>(params: CategoryStatus) {
        return Api.request<T>({
            options: {
                method: METHOD.PUT,
                url: AuthApis.SetCateforyStatus+`?ids=${params.id}&status=${params.status}`
            },
        });
    }
    AddCategoryForUser<T>(params: AddCategoryForUser) {
        return Api.request({
            special:false,
            options: {
                method: METHOD.POST,
                url: AuthApis.AddCategory+`?name=${params.name}&desscription=${params.description}`,
                data:params.data
        

            },
        });
        
    }
    UpdateCategory<T>(params: UpdateCategory) {
        return Api.request({
            special:false,
            options: {
                method: METHOD.PUT,
                url: AuthApis.UpdateCategory+`?categoryId=${params.id}&name=${params.name}&isActive=${params.isActive}&desscription=${params.description}`,
                data:params.data
            },
        });
    }
    UpdateWord<T>(params: UpdateWord) {
        return Api.request({
            special:false,
            options: {
                method: METHOD.PUT,
                url: AuthApis.UpdateWord+`?wordId=${params.wordId}&categoryId=${params.categoryId}&word=${params.word}&wordAudio=${params.wordAudio}&isActive=${params.isActive}`,
                data:params.data
            },
        });
    }
    DeleteCategory<T>(params: DeleteCategory) {
        return Api.request({
            special:false,
            options: {
                method: METHOD.DELETE,
                url: AuthApis.UpdateCategory+`?categoryId=${params.id}`,
               
        

            },
        });
        
    }
    
}
export default new RecodingApi();

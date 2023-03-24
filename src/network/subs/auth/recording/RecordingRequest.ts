export type     GetWordByCateID = {
    pageIndex: number,
    pageSize: number,
    word: string,

    categoryId: number,
    isActive: boolean
};
export type GetFullCategory = {
    pageIndex: number,
    pageSize: number,
    name: any,
    isActive: any,
    // categories: any
};
export type AddWordToStorage = {
    wordId:number
};


export type DeleteWordToStorage = {
    wordId:number
};
export type GetStorageWord = {
   
    data: any
};
export type VoiceInfor = {

    voiceGender: String,
    voiceLocation: String
};
export type GetVoice = {
   
    audioWord: String
};
export type CategoryStatus = {
   id:number,
   status:boolean
};
export type WordStatus = {
    wordId:number,
    status:boolean
 };

export type AddCategoryForUser = {
   
    name:string,
    description:string
    data:FormData,
    isActive: boolean

 };
export type UpdateCategory = {
    id:number,
    name:string,
    isActive:boolean,
    description:string
    data:FormData
 };

 export type UpdateWord = {
    wordId:number,
    categoryId:number,
    word:string,
    wordAudio:string,
    isActive:boolean,
    data:FormData
 }; 

export type AddWordForUser = {
    categoryId:number,
    word:string,
    wordAudio:string,
    data:FormData,
    isActive: boolean

 }; 

 export type DeleteCategory = {
   
   id: number

 };

 export type DeleteWord ={
    id: number
 };

 
// export type ForgotPassword = {
//     username: string;
// };
// export type RegisterWithEmailParams = {
//     email: string;
//     password: string;
//     fullName: string;
//     phone: string;
//     address: string;
//     genderType: string
// };
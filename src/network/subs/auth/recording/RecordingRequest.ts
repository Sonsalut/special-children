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
    isActive: boolean,
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
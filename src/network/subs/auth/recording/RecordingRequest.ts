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
    categories: any
};
export type GetStorageWord = {
   
    data: any
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
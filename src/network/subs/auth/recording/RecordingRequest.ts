export type GetWordByCateID = {
    pageIndex: number,
    pageSize: number,
    word: string,
    categoryId: number
};
export type GetFullCategory = {
    pageIndex: number,
    pageSize: number,
    pageTotal: number,
    categories: any
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
export interface DataLoginResponse {
  jwtToken: any;
  accessToken: string;
  refreshToken: string;
  accountInfo : any;
}
export interface LoginResponse {
  accountInfo: any;
  data: DataLoginResponse;
}
export interface Account {
  username : string,
  password : string,
}
export interface CategoryList {
  accountInfo: any;
  data: DataLoginResponse;
}

export interface FingerPrint {
 fingerprint: boolean;
}
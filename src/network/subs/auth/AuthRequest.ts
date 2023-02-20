export type LoginWithEmailParams = {
  username: string;
  password: string;
  // deviceType: 'android' | 'iOS';
  // deviceToken: string;
};
export type ChangePassword = {
  newPass: string;
  oldPass: string;
};
export type ForgotPassword = {
  username: string;
};
export type RegisterWithEmailParams = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
  genderType: string
};
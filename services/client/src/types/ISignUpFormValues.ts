export interface ISignUpFormValues {
  photo: File;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  age: string;
  gender: 'FEMALE' | 'MALE';
  maxDistance: string;
}

export interface ISignUpFormValues {
  photo: File | string | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

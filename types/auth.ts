export interface AuthResponseType {
  statusCode: number;
  status: string;
  title: string;
  message: string;
  data: any;
}

export interface LoginCredentialsType {
  role: string;
  email: string;
  password: string;
}

export interface SignupCredentialsType {
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  password: string;
  confirm_password: string;
}

export interface IUser {
    name: string;
    email: string;
    role: string;
    photo: string;
    _id: string;
    id: string;
    created_at: string;
    updated_at: string;
    __v: number;
    }
  
  export interface GenericResponse {
    status: string;
    message: string;
  }
  
  export interface ILoginInput {
    email: string;
    password: string;
  }
  
  export interface ISignUpInput {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }
  
  export interface ILoginResponse {
    status: string;
    access_token: string;
  }
  
  export interface ISignUpResponse {
    status: string;
    message: string;
  }
  
  export interface IUserResponse {
    status: string;
    data: {
      user: IUser;
    };
  }
  
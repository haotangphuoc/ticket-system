import { UserGetByIdParams } from "./userInterface"

export interface UserRegisterParams {
  password: string,
  email: string
}

export interface UserLoginParams {
  password: string,
  email: string
}

export interface LoginReturnParams {
  token: string,
  user: UserGetByIdParams
}
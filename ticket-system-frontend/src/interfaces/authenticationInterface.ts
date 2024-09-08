import { UserGetByIdFields } from "./userInterface"

export interface UserRegisterParams {
  password: string,
  email: string
}

export interface UserLoginParams {
  password: string,
  email: string
}

export interface LoginReturnFields {
  token: string,
  user: UserGetByIdFields
}
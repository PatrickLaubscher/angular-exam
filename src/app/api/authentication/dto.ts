import { User } from "../../shared/entities";


export interface UserRegisterDTO {
    displayName:string;
    email:string;
    password:string;
}

export interface LoginCredentialsDTO {
    email:string;
    password:string;
}

export interface LoginResponseDTO {
    user:User;
}


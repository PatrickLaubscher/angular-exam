import { Picture, User } from "../shared/entities";


export interface UserRegisterDTO {
    displayName:string;
    email:string;
    password:string;
}

export interface LoginCredentialsDTO {
    email:string;
    password:string;
}

export interface PostPictureDTO {
    title:string;
    description:string;
    image:string;

}

export interface CommentDTO {
    content:string;
    picture:Picture;
}
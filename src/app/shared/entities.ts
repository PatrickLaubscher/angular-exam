
export interface NavLink {
  path:string;
  name:string;
}

export interface Page<T>{
  content:T[];
  totalPages:number;
  totalElements:number;
  first:boolean;
  last:boolean;
}

export interface User {
  id:number;
  email:string;
  displayName:string;
  role:string;
}

export interface Picture {
  id:number;
  image:string;
  description:string;
  title:string;
  author:User;
  createdAt:Date;
  imageLink:string;
  thumbnailLink:string;
  likes?:Like[];
}

export interface Comment {
  id:number;
  content:string;
  createdAt:Date;
  author:User;
  picture:Picture;
}

export interface Like {
  user:User;
}
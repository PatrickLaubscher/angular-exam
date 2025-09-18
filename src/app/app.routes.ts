import { Routes } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';
import { HomePage } from './home-page/home-page';
import { PictureDetailPage } from './pictures-page/picture-detail-page/picture-detail-page';
import { UserPicturesPage } from './pictures-page/user-pictures-page/user-pictures-page';
import { LoginPage } from './api/authentication/login-page/login-page';
import { RegisterPage } from './api/authentication/register-page/register-page';
import { LogoutPage } from './api/authentication/logout-page/logout-page';

export const routes: Routes = [
    {path:"", component: PublicLayout, children:[
        {path:"", component:HomePage},
        {path:"login", component:LoginPage},
        {path:"logout", component:LogoutPage},
        {path:"register", component:RegisterPage},
        {path:"picture/:id", component:PictureDetailPage},
        {path:"author-pictures/:userId", component:UserPicturesPage}
    ]}
];

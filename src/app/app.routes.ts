import { Routes } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
    {path:"", component: PublicLayout, children:[
        {path:"", component:HomePage}
    ]}
];

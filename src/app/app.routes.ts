import { Routes } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';
import { HomePage } from './home-page/home-page';
import { PictureDetailPage } from './pictures-page/picture-detail-page/picture-detail-page';

export const routes: Routes = [
    {path:"", component: PublicLayout, children:[
        {path:"", component:HomePage},
        {path:"picture/:id", component:PictureDetailPage}
    ]}
];

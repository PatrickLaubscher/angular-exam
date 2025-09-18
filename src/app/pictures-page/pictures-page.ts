import { Component, inject, input } from '@angular/core';
import { PictureApi } from '../api/pictures/picture-api';
import { PicturesList } from "./pictures-list/pictures-list";

@Component({
  selector: 'app-pictures-page',
  imports: [PicturesList],
  templateUrl: './pictures-page.html',
  styleUrl: './pictures-page.css'
})
export class PicturesPage {

  private readonly pictureApi = inject(PictureApi);

  protected readonly page = input(1, {transform: (val) => val ? Number(val):1});

  protected readonly picturePage = this.pictureApi.getAll(this.page);

  reload(changeOnPicture:boolean){
    if(changeOnPicture){
      this.picturePage.reload();
    }
  }


}

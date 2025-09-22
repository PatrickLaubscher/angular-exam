import { Component, inject, input } from '@angular/core';
import { PictureApi } from '../api/pictures/picture-api';
import { PicturesList } from "./pictures-list/pictures-list";
import { DisplayPagination } from "../display-pagination/display-pagination";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-pictures-page',
  imports: [PicturesList, DisplayPagination],
  templateUrl: './pictures-page.html',
  styleUrl: './pictures-page.css'
})
export class PicturesPage {

  private readonly pictureApi = inject(PictureApi);
  private readonly route = inject(ActivatedRoute);

  protected readonly pageNumber = toSignal(
    this.route.queryParamMap.pipe(
      map(params => +(params.get('pageNumber') ?? 1)) 
    ),
    { initialValue: 1 }
  );
  
  protected readonly picturePage = this.pictureApi.getAll(this.pageNumber);

  reload(changeOnPicture:boolean){
    if(changeOnPicture){
      this.picturePage.reload();
    }
  }
  
}

import { Component } from '@angular/core';
import { PicturesList } from "../pictures-list/pictures-list";

@Component({
  selector: 'app-user-pictures-page',
  imports: [PicturesList],
  templateUrl: './user-pictures-page.html',
  styleUrl: './user-pictures-page.css'
})
export class UserPicturesPage {

  private readonly pictureApi = inject(PictureApi);
  readonly userId = input<number>();

  protected readonly page = input(1, {transform: (val) => val ? Number(val):1});

  protected readonly picturePage = this.pictureApi.getAll(this.page, userId);

}

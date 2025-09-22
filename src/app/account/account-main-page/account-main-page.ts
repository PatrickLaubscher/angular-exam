import { Component, inject, input, signal } from '@angular/core';
import { AuthenticationApi } from '../../api/authentication/authentication-api';
import { User } from '../../shared/entities';
import { PictureApi } from '../../api/pictures/picture-api';
import { PicturesList } from "../../pictures-page/pictures-list/pictures-list";

@Component({
  selector: 'app-account-main-page',
  imports: [PicturesList],
  templateUrl: './account-main-page.html',
  styleUrl: './account-main-page.css'
})
export class AccountMainPage {

  protected readonly auth = inject(AuthenticationApi);
  private readonly pictureApi = inject(PictureApi);
  readonly userId = signal<number>(this.auth.user()!.id);

  protected readonly page = input(1, {transform: (val) => val ? Number(val):1});

  protected readonly picturePage = this.pictureApi.getAllByUser(this.userId, this.page);

}

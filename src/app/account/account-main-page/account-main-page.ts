import { Component, inject, input, signal } from '@angular/core';
import { AuthenticationApi } from '../../api/authentication/authentication-api';
import { User } from '../../shared/entities';
import { PictureApi } from '../../api/pictures/picture-api';
import { PicturesList } from "../../pictures-page/pictures-list/pictures-list";
import { DisplayPagination } from "../../display-pagination/display-pagination";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-main-page',
  imports: [PicturesList, DisplayPagination],
  templateUrl: './account-main-page.html',
  styleUrl: './account-main-page.css'
})
export class AccountMainPage {

  protected readonly auth = inject(AuthenticationApi);
  private readonly pictureApi = inject(PictureApi);
  readonly userId = signal<number>(this.auth.user()!.id);
  private readonly route = inject(ActivatedRoute);

  protected readonly page = input(1, {transform: (val) => val ? Number(val):1});

  protected readonly pageNumber = toSignal(
    this.route.queryParamMap.pipe(
      map(params => +(params.get('pageNumber') ?? 1)) 
    ),
    { initialValue: 1 }
  );
  

  protected readonly picturePage = this.pictureApi.getAllByUser(this.userId, this.page);

}

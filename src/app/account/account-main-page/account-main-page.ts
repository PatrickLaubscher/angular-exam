import { Component, inject, input, signal } from '@angular/core';
import { AuthenticationApi } from '../../api/authentication/authentication-api';
import { Picture, User } from '../../shared/entities';
import { PictureApi } from '../../api/pictures/picture-api';
import { PicturesList } from "../../pictures-page/pictures-list/pictures-list";
import { DisplayPagination } from "../../display-pagination/display-pagination";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StandardModal } from "../../standard-modal/standard-modal";

@Component({
  selector: 'app-account-main-page',
  imports: [PicturesList, DisplayPagination, StandardModal],
  templateUrl: './account-main-page.html',
  styleUrl: './account-main-page.css'
})
export class AccountMainPage {

  protected readonly auth = inject(AuthenticationApi);
  protected readonly pictureApi = inject(PictureApi);
  protected readonly isDeleteModalOpen = signal(false);
  protected readonly userId = signal<number>(this.auth.user()!.id);
  protected readonly route = inject(ActivatedRoute);
  protected readonly picture = signal<Picture|null>(null);
  protected readonly serverError = signal('');

  protected readonly page = input(1, {transform: (val) => val ? Number(val):1});

  protected readonly pageNumber = toSignal(
    this.route.queryParamMap.pipe(
      map(params => +(params.get('pageNumber') ?? 1)) 
    ),
    { initialValue: 1 }
  );
  
  protected readonly picturePage = this.pictureApi.getAllByUser(this.userId, this.page);

  showDeleteModal(picture:Picture) {
    this.isDeleteModalOpen.set(true);
    this.picture.set(picture);
  }

  deletePicture() {
    const picture = this.picture();
    if (!picture) return;
 
    const pictureId = signal<number>(picture.id);
    this.pictureApi.delete(pictureId).subscribe({
    next: () => {
      this.isDeleteModalOpen.set(false);
      this.picturePage.reload();
    },
    error: () => {
      this.serverError.set("Erreur dans la suppression de l'image");
    }
  });

  }



}

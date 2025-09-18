import { Component, inject, input } from '@angular/core';
import { PictureApi } from '../../api/pictures/picture-api';
import { CommentApi } from '../../api/comment/comment-api';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommentForm } from "../../comment-form/comment-form";
import { AuthenticationApi } from '../../api/authentication/authentication-api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LikeApi } from '../../api/like/like-api';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapSuitHeart, bootstrapSuitHeartFill } from '@ng-icons/bootstrap-icons';


@Component({
  selector: 'app-picture-detail-page',
  imports: [DatePipe, RouterLink, CommentForm, NgIcon],
  providers: [provideIcons({ bootstrapSuitHeart, bootstrapSuitHeartFill }) ],
  templateUrl: './picture-detail-page.html',
  styleUrl: './picture-detail-page.css'
})
export class PictureDetailPage {

  private readonly pictureApi = inject(PictureApi);
  private readonly commentApi = inject(CommentApi);
  private readonly auth = inject(AuthenticationApi);
  private readonly snackBar = inject(MatSnackBar);
  private readonly likeApi = inject(LikeApi);
  readonly id = input.required<number>();
  readonly picture = this.pictureApi.getOne(this.id);
  readonly comment = this.commentApi.getAllByPictureId(this.id);

  reload(addCommentOutput:boolean) {
    if(addCommentOutput) {
      this.comment.reload();
    }
  }

  like() {
    if(!this.auth.isLogged) {
      this.snackBar.open('Connectez-vous pour "liker" vos images favorites', 'ok', {duration:5000});
      return
    }
    this.likeApi.add(this.id()).subscribe({
      next: () => this.picture.reload()
    });
  }


}

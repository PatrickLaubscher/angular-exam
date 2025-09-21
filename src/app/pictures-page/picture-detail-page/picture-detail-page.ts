import { Component, inject, input, signal } from '@angular/core';
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
import { CommentDTO } from '../../api/dto';


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

  protected readonly serverError = signal('');
  readonly id = input.required<number>();
  readonly picture = this.pictureApi.getOne(this.id);
  readonly comment = this.commentApi.getAllByPictureId(this.id);


  like() {
    if(!this.auth.isLogged) {
      this.snackBar.open('Connectez-vous pour "liker" vos images favorites', 'ok', {duration:5000});
      return
    }
    this.likeApi.add(this.id()).subscribe({
      next: () => this.picture.reload()
    });
  }


  addComment(newComment:CommentDTO) {

    this.serverError.set('');

    if(this.picture.value()?.author.id == this.auth.user()?.id) {
      this.snackBar.open('Vous ne pouvez pas commenter vos propres photos mais vous pouvez modifier leur description.', 'ok', {duration: 5000})
      return;
    }

    this.commentApi.add(newComment)
      .subscribe({
        next: () => {
          this.snackBar.open('Votre commentaire a bien été rajouté !', 'ok', {duration: 5000});
          this.comment.reload();
        },
        error: () => {
          this.serverError.set("Erreur serveur");
        }
      });
    
  }
  


}

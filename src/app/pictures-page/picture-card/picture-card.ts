import { Component, inject, input, output } from '@angular/core';
import { Picture } from '../../shared/entities';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapSuitHeart, bootstrapSuitHeartFill } from '@ng-icons/bootstrap-icons';
import { LikeApi } from '../../api/like/like-api';
import { AuthenticationApi } from '../../api/authentication/authentication-api';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-picture-card',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ bootstrapSuitHeart,bootstrapSuitHeartFill })],
  templateUrl: './picture-card.html',
  styleUrl: './picture-card.css'
})
export class PictureCard {

  private readonly auth = inject(AuthenticationApi);
  private readonly snackBar = inject(MatSnackBar);
  readonly picture = input.required<Picture>();
  private readonly likeApi = inject(LikeApi);

  readonly addLikeOutput = output<boolean>(); 

  like() {
    if(!this.auth.isLogged) {
      this.snackBar.open('Connectez-vous pour "liker" vos images favorites', 'ok', {duration:5000});
      return
    }
    this.likeApi.add(this.picture().id).subscribe({
      next: () => this.addLikeOutput.emit(true)
    });
  }

}

import { Component, input } from '@angular/core';
import { Picture } from '../../shared/entities';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapSuitHeart } from '@ng-icons/bootstrap-icons';



@Component({
  selector: 'app-picture-card',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ bootstrapSuitHeart })],
  templateUrl: './picture-card.html',
  styleUrl: './picture-card.css'
})
export class PictureCard {

  readonly picture = input.required<Picture>();

}

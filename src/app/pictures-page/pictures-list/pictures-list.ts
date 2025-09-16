import { Component, input } from '@angular/core';
import { Picture } from '../../shared/entities';
import { PictureCard } from "../picture-card/picture-card";

@Component({
  selector: 'app-pictures-list',
  imports: [PictureCard],
  templateUrl: './pictures-list.html',
  styleUrl: './pictures-list.css'
})
export class PicturesList {

  readonly pictures = input.required<Picture[]>();

}

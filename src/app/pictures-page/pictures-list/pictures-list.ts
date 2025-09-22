import { Component, input, output } from '@angular/core';
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

  readonly changeOnPicture = output<Picture>();
  readonly deletePictureOutput = output<Picture>();
  readonly updatePictureOutput = output<Picture>();


  reloadList(picture:Picture) {
    this.changeOnPicture.emit(picture);
  }

  deletePicture(picture:Picture) {
    this.deletePictureOutput.emit(picture);
  }

  updatePicture(picture:Picture) {
    this.updatePictureOutput.emit(picture);
  }
  
}

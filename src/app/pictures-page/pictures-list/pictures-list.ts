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

  readonly changeOnPicture = output<boolean>();
  readonly deletePictureOutput = output<Picture>();
  readonly updatePictureOutPut = output<Picture>();


  reloadList(addLikeOutput:boolean) {
    if(addLikeOutput) {
      this.changeOnPicture.emit(true);
    }
  }

  deletePicture(picture:Picture) {
    this.deletePictureOutput.emit(picture);
  }

  uploadPicture(picture:Picture) {
    this.updatePictureOutPut.emit(picture);
  }
  
}

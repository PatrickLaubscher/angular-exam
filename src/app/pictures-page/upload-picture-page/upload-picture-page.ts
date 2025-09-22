import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostPictureDTO } from '../../api/dto';
import { PictureApi } from '../../api/pictures/picture-api';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PictureForm } from "./picture-form/picture-form";

@Component({
  selector: 'app-upload-picture-page',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, PictureForm],
  templateUrl: './upload-picture-page.html',
  styleUrl: './upload-picture-page.css'
})
export class UploadPicturePage {

  private readonly pictureApi = inject(PictureApi);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  protected readonly serverError = signal('');


  addPicture(newPicture:PostPictureDTO, pictureFile:File|undefined) {

    this.serverError.set('');

    if(!pictureFile) {
      this.snackBar.open('Le fichier d\'image n\'as pas été rajoutée', 'ok', {duration: 5000});
      return;
    } 

    this.pictureApi.upload(pictureFile)
      .pipe(
        switchMap(uploadResponse => {
          newPicture.image = uploadResponse.filename;
          return this.pictureApi.add(newPicture);
      }))
      .subscribe({
        next: addedPicture => {
          this.snackBar.open('Bravo, votre image a bien été enregistrée !', 'ok', {duration: 5000})
          this.router.navigate(['picture/', addedPicture.id]);
        },
        error: () => {
          this.serverError.set("Erreur serveur");
        }
      });
    
  }





}

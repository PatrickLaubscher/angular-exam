import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostPictureDTO } from '../../api/authentication/dto';
import { PictureApi } from '../../api/pictures/picture-api';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, of, switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-upload-picture-page',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './upload-picture-page.html',
  styleUrl: './upload-picture-page.css'
})
export class UploadPicturePage {

  private readonly pictureApi = inject(PictureApi);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  protected readonly serverError = signal('');

  private readonly fb = inject(FormBuilder);

  pictureFile?: File;

  protected readonly form = new FormGroup({
    title: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(4)]}),
    description: new FormControl<string>('', {validators: [Validators.required]}),
    image: new FormControl<string>('')
  });


  extractFile(event: Event) {
    const target = event.target as HTMLInputElement;
    this.pictureFile = target.files?.[0];
  }


  addPicture(newPicture:PostPictureDTO, pictureFile:File|undefined) {

    this.serverError.set('');

    if(!pictureFile) {
      this.snackBar.open('Le fichier d\'image n\'as pas été rajoutée', 'ok', {duration: 5000});
      return;
    } 

    this.pictureApi.upload(pictureFile)
      .pipe(
        switchMap(uploadres => {
          newPicture.image = uploadres.filename;
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


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }
    const newPicture:PostPictureDTO = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      image: this.form.value.image!
    }
    this.addPicture(newPicture, this.pictureFile);
  }


}

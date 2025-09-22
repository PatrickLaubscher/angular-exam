import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { PostPictureDTO } from '../../../api/dto';
import { Picture } from '../../../shared/entities';

@Component({
  selector: 'app-picture-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './picture-form.html',
  styleUrl: './picture-form.css'
})
export class PictureForm {

  pictureFormSubmit = output<{picture: PostPictureDTO, pictureFile: File | undefined}>();

  readonly pictureValues = input<Picture>();

  protected readonly router = inject(Router);

  pictureFile?: File;

  protected readonly form = new FormGroup({
      title: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(4)]}),
      description: new FormControl<string>('', {validators: [Validators.required]}),
      image: new FormControl<string>('')
  });

  constructor() {
    effect(() => {
      const picture = this.pictureValues();
      if(picture) {
        this.form.setValue({
          title: picture.title,
          description : picture.description,
          image: picture.image
        })
      }
    })
  }
  
  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }
    const newPicture:PostPictureDTO = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      image: this.form.value.image!
    }
    this.pictureFormSubmit.emit({
      picture: newPicture,
      pictureFile: this.pictureFile
    })
  }

    
  extractFile(event: Event) {
    const target = event.target as HTMLInputElement;
    this.pictureFile = target.files?.[0];
  }


  get currentUrl(): string {
    return this.router.url;
  }

}

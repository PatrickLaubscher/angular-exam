import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentApi } from '../api/comment/comment-api';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentDTO } from '../api/dto';
import { Picture } from '../shared/entities';
import { AuthenticationApi } from '../api/authentication/authentication-api';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.css'
})
export class CommentForm {

  private readonly commentApi = inject(CommentApi);
  private readonly auth = inject(AuthenticationApi);
  private readonly snackBar = inject(MatSnackBar);
  protected readonly serverError = signal('');

  readonly picture = input.required<Picture>();
  readonly addCommentOutput = output<boolean>(); 

  private readonly fb = inject(FormBuilder);

  protected readonly form = new FormGroup({
    content: new FormControl<string>('', {validators: [Validators.required]})
  });


  addComment(newComment:CommentDTO) {

    this.serverError.set('');

    if(this.picture().author.id == this.auth.user()?.id) {
      this.snackBar.open('Vous ne pouvez pas commenter vos propres photos mais vous pouvez modifier leur description.', 'ok', {duration: 5000})
      return;
    }

    this.commentApi.add(newComment)
      .subscribe({
        next: () => {
          this.snackBar.open('Votre commentaire a bien été rajouté !', 'ok', {duration: 5000});
          this.addCommentOutput.emit(true);
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
    const newComment:CommentDTO = {
      content: this.form.value.content!,
      picture: this.picture()
    }
    this.addComment(newComment);
  }


}

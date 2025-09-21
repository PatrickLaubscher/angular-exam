import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentDTO } from '../api/dto';
import { Picture } from '../shared/entities';



@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.css'
})
export class CommentForm {

  readonly picture = input.required<Picture>();

  commentOutput = output<CommentDTO>(); 

  protected readonly form = new FormGroup({
    content: new FormControl<string>('', {validators: [Validators.required]})
  });
  

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }
    const newComment:CommentDTO = {
      content: this.form.value.content!,
      picture: this.picture()
    }

    this.commentOutput.emit(newComment);
    this.form.reset();
  }


}

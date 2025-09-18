import { Component, inject, input } from '@angular/core';
import { PictureApi } from '../../api/pictures/picture-api';
import { CommentApi } from '../../api/comment/comment-api';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommentForm } from "../../comment-form/comment-form";


@Component({
  selector: 'app-picture-detail-page',
  imports: [DatePipe, RouterLink, CommentForm],
  templateUrl: './picture-detail-page.html',
  styleUrl: './picture-detail-page.css'
})
export class PictureDetailPage {

  private readonly pictureApi = inject(PictureApi);
  private readonly commentApi = inject(CommentApi);
  readonly id = input.required<number>();
  readonly picture = this.pictureApi.getOne(this.id);
  readonly comment = this.commentApi.getAllByPictureId(this.id);

  reload(addCommentOutput:boolean) {
    if(addCommentOutput) {
      this.comment.reload();
    }
  }
  

}

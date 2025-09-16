import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Comment } from '../../shared/entities';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentApi {

  private readonly http = inject(HttpClient);

  
  getAllByPictureId(pictureId:Signal<number>) {
    return httpResource<Comment[]>(() => environment.serverUrl+'/api/picture/' + pictureId() + '/comment');
  }


  
}

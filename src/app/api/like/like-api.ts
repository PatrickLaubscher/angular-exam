import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Picture } from '../../shared/entities';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LikeApi {
  
  private readonly http = inject(HttpClient);


  add(pictureId:number) {
    return this.http.patch<Picture>(environment.serverUrl + '/api/picture/' + pictureId + '/like', null);
  }

}

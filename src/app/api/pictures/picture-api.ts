import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Page, Picture } from '../../shared/entities';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PictureApi {

  private readonly http = inject(HttpClient);
  

  getAll(page?:Signal<number>) {
    return httpResource<Page<Picture>>(() => {
      const params:any = {
        page: page ? page():1
      }

      return {
        url: environment.serverUrl+'/api/picture',
        params
      }
    });
  }

  getOne(id:Signal<number>) {
    return httpResource<Picture>(() => environment.serverUrl+'/api/picture/' + id());

  }


}

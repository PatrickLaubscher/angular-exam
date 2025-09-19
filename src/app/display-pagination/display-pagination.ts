import { Component, input } from '@angular/core';
import { Page } from '../shared/entities';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-display-pagination',
  imports: [RouterLink],
  templateUrl: './display-pagination.html',
  styleUrl: './display-pagination.css'
})
export class DisplayPagination {

  
  readonly paginated = input.required<Page<any>>();
  readonly pageNumber = input.required<number>();


}

import { Component, model } from '@angular/core';

@Component({
  selector: 'app-standard-modal',
  imports: [],
  templateUrl: './standard-modal.html',
  styleUrl: './standard-modal.css'
})
export class StandardModal {

  open = model.required<boolean>();

}

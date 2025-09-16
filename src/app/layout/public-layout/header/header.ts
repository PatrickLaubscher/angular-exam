import { Component, signal } from '@angular/core';
import { NavLink } from '../../../shared/entities';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

    protected readonly navLinks = signal<NavLink[]>([
    {
      path:"/",
      name: "Home"
    },


  ]);


}

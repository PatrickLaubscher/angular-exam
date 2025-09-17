import { Component, computed, effect, inject, signal } from '@angular/core';
import { NavLink } from '../../../shared/entities';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationApi } from '../../../api/authentication/authentication-api';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  protected readonly auth = inject(AuthenticationApi);
  
  displayedLinks = computed(() =>
    effect(() => {
      this.navAuth.set(this.auth.isLogged ? this.navLogin : this.navLogOut);
    })
  );


  protected readonly navLinks = signal<NavLink[]>([
    {
      path:"/",
      name: "Galerie"
    }
  ]);

  protected readonly navAuth = signal<NavLink[]>;

  navLogin:NavLink[] = [
    {
      path:"/login",
      name: "Se connecter"
    },
    {
      path:"/register",
      name: "Créer un compte"
    },
  ];

  navLogOut:NavLink[] = [
    {
      path:"/logout",
      name: "Se déconnecter"
    }
  ];

}

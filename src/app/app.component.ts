import { Component } from '@angular/core';
import { NavbarService } from './services/NavbarService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'advogado-freelancer-web-front';
  constructor(public navbarService: NavbarService) {}
}

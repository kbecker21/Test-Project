import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


/**
 * Diese Komponente implementiert die App
 */
export class AppComponent implements OnInit {
  title = 'ng-quiz';

  constructor(private authService: AuthService) { }

  /**
   * Initialisiert den Benutzer.
   */
  ngOnInit() {
    this.authService.autoLogin();
  }

}

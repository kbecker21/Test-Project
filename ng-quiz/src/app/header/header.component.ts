import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

/**
 * Diese Komponente implementiert das Kopfmenü.
 */
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;
  isTutor = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) { }

  /**
   * Initialisiert den aktuellen Benutzer.
   */
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      this.isAdmin = user && user.isAdmin();
      this.isTutor = user && user.isTutor();
    });
  }

  /**
   * Meldet den aktuellen Benutzer ab.
   */
  onLogout() {
    this.authService.logout();
  }

  /**
  * Beendet alle Subscriptions.
  */
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }



}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})

/**
 * Diese Komponente implementiert die Fehlermeldung.
 */
export class ErrorPageComponent implements OnInit, OnDestroy {
  errorMessage: string;
  dataSub: Subscription = null;

  constructor(private route: ActivatedRoute) { }

  /**
   * Initialisiert die Fehlermeldung.
   */
  ngOnInit(): void {
    this.dataSub = this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );
  }

  /**
  * Beendet alle Subscriptions.
  */
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

}

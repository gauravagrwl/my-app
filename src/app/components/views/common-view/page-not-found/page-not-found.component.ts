import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <p>
      Ohhhh!!!! This page do not exit!!! Plese go back to
      <a routerLink="/home">Home</a>
    </p>
  `,
  styles: ``,
})
export class PageNotFoundComponent {}

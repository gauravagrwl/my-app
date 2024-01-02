import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/common-view/home/home.component';
import { PageNotFoundComponent } from './components/views/common-view/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'tracker',
    loadChildren: () =>
      import('./components/views/tracker/tracker.module').then(
        (m) => m.TrackerModule
      ),
  },
  {
    path: 'finance',
    loadChildren: () =>
      import('./components/views/finance/finance.module').then(
        (m) => m.FinanceModule
      ),
  },
  {
    path: 'investments',
    loadChildren: () =>
      import('./components/views/investments/investments.module').then(
        (m) => m.InvestmentsModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

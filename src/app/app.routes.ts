import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { LedgersComponent } from './components/ledgers/ledgers.component';
import { StatementsComponent } from './components/statements/statements.component';
import { HoldingsComponent } from './components/holdings/holdings.component';
import { TradingComponent } from './components/trading/trading.component';
import { LoginComponent } from './components/common/login/login.component';
import { LogoutComponent } from './components/common/logout/logout.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LandingPageComponent },

    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },

    { path: 'accounts', component: AccountsComponent },

    { path: 'ledger', component: LedgersComponent },

    { path: 'statements', component: StatementsComponent },
    { path: 'statements/:id', component: StatementsComponent },

    { path: 'reports', component: ReportsComponent },

    { path: 'holdings', component: HoldingsComponent },

    { path: 'trading', component: TradingComponent },

    { path: 'tracker', component: TradingComponent },

    { path: '**', component: PageNotFoundComponent },
]

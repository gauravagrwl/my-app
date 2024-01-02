import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackerHomeComponent } from './tracker-home/tracker-home.component';
import { TaskComponent } from './task/task.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';

const routes: Routes = [
  { path: '', redirectTo: '/tracker/home', pathMatch: 'full' },
  { path: 'home', component: TrackerHomeComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'newsFeed', component: NewsFeedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackerRoutingModule {}

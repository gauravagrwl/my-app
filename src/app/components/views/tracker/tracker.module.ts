import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerRoutingModule } from './tracker-routing.module';
import { TaskComponent } from './task/task.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { TrackerHomeComponent } from './tracker-home/tracker-home.component';
import { AppMaterialModule } from '../../../app-material.module';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskComponent,
    NewsFeedComponent,
    TrackerHomeComponent,
    CreateTaskComponent,
  ],
  imports: [
    CommonModule,
    TrackerRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
})
export class TrackerModule {}

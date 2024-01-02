import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonViewModule } from './common-view/common-view.module';
import { TrackerModule } from './tracker/tracker.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CommonViewModule, TrackerModule],
})
export class ViewsModule {}

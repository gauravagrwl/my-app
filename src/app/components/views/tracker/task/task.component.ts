import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../models/task.model';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  
  deleteTask(id: String) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.getTasks(),
      error: (e) => console.log,
    });
  }
  public showComplete: boolean = false;

  public markComplete(id: String) {
    this.taskService.markCompleteTask(id).subscribe({
      next: () => this.getTasks(),
      error: (e) => console.log,
    });
  }
  public onCloseReport() {
    this.addnewTask = false;
    this.getTasks();
  }
  displayedColumns: string[] = [
    'Position',
    'Task',
    'Priority',
    // 'Type',
    'StartDate',
    'TargetDate',
    'Completed',
    'Delete',
  ];

  tasks: Task[] = [];
  addnewTask = false;

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.getTasks();
  }

  async getTasks() {
    let results = await this.taskService.getTasks();
    this.tasks = results.filter(
      (item: Task) => this.showComplete || !item.completed
    );
  }
}

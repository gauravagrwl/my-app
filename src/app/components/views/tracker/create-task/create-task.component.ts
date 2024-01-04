import { TaskService } from './../../../../services/task.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../../models/task1.model';

interface TaskForm {
  task: FormControl<string>;
  priority: FormControl<string>;
  type: FormControl<string>;
  startDate: FormControl<string>;
  targetDate: FormControl<string>;
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  taskForm = new FormGroup<TaskForm>({
    task: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    priority: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    type: new FormControl(),
    startDate: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    targetDate: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  suggestions: Task[] = [];
  @Output() formClose = new EventEmitter();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // this.taskForm.controls.task.valueChanges.subscribe((task) => {
    //   this.suggestions = this.taskService.getSuggestions(task);
    // });
  }

  addTask() {
    if (this.taskForm && this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.taskService
      .createNewTask(this.taskForm.getRawValue() as Task)
      .subscribe();
    this.formClose.emit();
  }
}

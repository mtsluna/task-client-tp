import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../../services/tasks/task.service";
import {Task} from "../../../models/Tasks";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  loading: boolean = true;
  type: string = ''

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(res => {
      this.type = res.type;
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.taskService.getAll(this.type).subscribe( res => {
      this.tasks = res;
      this.loading = false;
    })
  }

  receiveFilterEvent(event: any) {
    this.taskService.getAll(this.type, event).subscribe( res => {
      this.tasks = res;
      this.loading = false;
    })
  }

}

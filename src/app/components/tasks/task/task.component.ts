import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../../models/Tasks";
import {MatDialog} from "@angular/material/dialog";
import {TaskDetailComponent} from "../task-detail/task-detail.component";
import {TaskService} from "../../../services/tasks/task.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogComponent} from "../../shared/dialog/dialog.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task!: Task;
  @Output() deletedTask: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog, private taskService: TaskService,private toast: MatSnackBar) { }

  ngOnInit(): void {
  }

  openTask(task: Task) {
    this.dialog.open(TaskDetailComponent, {
      width: '95%',
      height: 'auto',
      maxHeight: '800px',
      data: {taskId: task.id},
      autoFocus: false
    }).afterClosed().subscribe(() =>{
    })
  }

  deleteTask(task: Task){
    let response: boolean = false;
    this.dialog.open(DialogComponent,{
      autoFocus: false,
      data: {message: 'Esta seguro de que desea borrar la tarea?'}
    }).afterClosed().toPromise().then(res => {
      response = res;
    }).then(() => {
      if(response) {
        this.taskService.delete(task.id).subscribe(res => {
          if(res.status === 204) {
            this.toast.open('Tarea eliminada con éxito','Cerrar',{duration: 3000});
            this.deletedTask.emit();
          }
        });
      }
    })
  }


}

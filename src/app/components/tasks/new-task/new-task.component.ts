import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {TaskService} from "../../../services/tasks/task.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  types: string[] = [
    'Finanzas',
    'Administrativa',
    'Personal',
    'Comunicación',
    'Otros'
  ]

  task: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    due_date: [''],
    creation_date: [''],
    numeric_reference: [''],
    observation: [''],
    id: [''],
    user_id: [''],
    type: [''],
    calendar_event: [false]
  });

  constructor(private fb: FormBuilder, private taskService: TaskService,
              private toast: MatSnackBar, private router: Router,private dialogRef: MatDialogRef<any>) {}

  ngOnInit(): void {
  }

  saveTask(task: FormGroup): void {
    task.patchValue({due_date: new Date(new Date(task.getRawValue().due_date || new Date().toString()).toUTCString()).toISOString()});
    this.taskService.newTask(task.getRawValue()).subscribe(res => {
      if(res.status === 201){
        this.dialogRef.close()
        this.toast.open('Tarea creada con éxito','Cerrar',{duration: 3000});
        this.router.navigate(['/']);
      }
    });
  }
}

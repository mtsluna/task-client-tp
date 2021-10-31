import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../services/tasks/task.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe, formatDate} from "@angular/common";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  providers: [DatePipe]
})
export class TaskDetailComponent implements OnInit {

  task: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    due_date: [''],
    creation_date: [''],
    numeric_reference: [''],
    observation: ['', [Validators.required]],
    id: [''],
    user_id: [''],
    calendar_event: [''],
    event_id: ['']
  });

  loading: boolean = true;
  type: string = '';

  constructor(private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder, private taskService: TaskService,private toast: MatSnackBar,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.taskService.getOne(this.data.taskId).subscribe(res => {
      this.task.patchValue(res);
      this.task.disable();
      this.task.patchValue({due_date: this.datePipe.transform(res.due_date,'yyyy-MM-ddTHH:mm')});
      this.loading = false;
    })
  }

  updateTask(task: FormGroup, id: string){
    task.patchValue({due_date: new Date(new Date(task.getRawValue().due_date || new Date().toString()).toUTCString()).toISOString()});
    this.taskService.update(task.getRawValue(),id).subscribe(res => {
      if (res.status === 200) {
        this.toast.open('Tarea modificada con éxito','Cerrar',{duration: 3000});
        this.dialogRef.close()
      }
    });
  }

  enableForm(){
    this.task.enable();
  }



}

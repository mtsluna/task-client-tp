import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewTaskComponent} from "../tasks/new-task/new-task.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  newTask() {
    this.dialog.open(NewTaskComponent, {
      width: '95%',
      height: 'auto',
      maxHeight: '800px',
      autoFocus: false
    }).afterClosed().subscribe(() =>{
    })
  }

}

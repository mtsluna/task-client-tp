import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewTaskComponent} from "./new-task/new-task.component";
import {TaskDetailComponent} from "./task-detail/task-detail.component";
import {TaskListComponent} from "./task-list/task-list.component";

const routes: Routes = [
  {path: 'new', component: NewTaskComponent},
  {path: ':id', component: TaskDetailComponent},
  {path: 'tasks/list/:type', component: TaskListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }

import { UserAdminComponent } from './components/shared/user-admin/user-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {TokenGuard} from "./guards/token.guard";

const routes: Routes = [
  {path: 'task',loadChildren: () => import('./components/tasks/tasks.module').then(m => m.TasksModule), canLoad: [TokenGuard]},
  {path: '', component: HomeComponent, canActivate: [TokenGuard]},
  {path: 'admin', component: UserAdminComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

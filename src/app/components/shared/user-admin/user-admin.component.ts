import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../../services/users/user.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {


  displayedColumns: string[] = ['id','username', 'name', 'created_at'];
  users: any[] = []
  @ViewChild('addUser') userAddModal!: TemplateRef<any>;
  userForm!: FormGroup;

  constructor(private userService:UserService,
              private toast: MatSnackBar,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getAllUsers()
  }


  getAllUsers() {
    this.userService.getAll().subscribe(async res => {
      this.users = await res;
      console.log(this.users)
    }, err => {
      console.log(err)
    })
  }

  registerNewUser(user: any) {
    this.userService.register(user).subscribe(res => {
      this.toast.open('Usuario creado con éxito','Cerrar',{duration: 3000});
      this.getAllUsers();
    }, err => {
      console.log(err)
    })

  }

  openAddUserModal(){
    let dialogRef = this.dialog.open(this.userAddModal, {
      height: 'auto',
      width: '600px',
    });
    this.buildForm()
  }

  buildForm(){
    this.userForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ])
    })
  }
}

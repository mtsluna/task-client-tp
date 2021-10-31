import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = {
    username: undefined,
    password: undefined
  }

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.tokenService.getTokenForLoginHttp(this.login).subscribe(res => {
      this.tokenService.saveTokenInStorage(JSON.stringify(res));
      this.router.navigate(['/']);
    })
  }

}

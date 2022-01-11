import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Globals } from '../globals/globals';

export class User {
  idUser: number | undefined;
  email: string | undefined;
}

export class AuthResponse {
  token!: string;
  user: User = new User;
  success: boolean = false;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public email!: string;
  public password!: string;
  public invalidAuth!: boolean;

  constructor(private authService: AuthService, private router: Router, private globals: Globals) { }

  ngOnInit(): void {
    this.invalidAuth = false
  }

  auth() {
    this.authService.auth(this.email, this.password).subscribe(response => {
      if (response.success) {
        this.globals.loginData.token = response.token
        this.globals.loginData.user = response.user
        this.invalidAuth = false
        this.router.navigate(['/lists'])
      } else {
        this.invalidAuth = true
      }
    }, err => {
      this.invalidAuth = true
    })
  }

}

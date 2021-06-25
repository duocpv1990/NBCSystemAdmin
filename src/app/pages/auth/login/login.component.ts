import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { CiAuthService } from '@consult-indochina/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorLogin: any;
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private authService: AuthenticationService,
    private ciAuthService: CiAuthService
  ) { }

  data = {
    type: {
      phone: 'phone',
      password: 'password',
    },
  };

  ngOnInit(): void { }

  login(ev) {
    let loginValue = {
      Username: ev.username,
      Password: ev.password,
    }
    this.ciAuthService.login(loginValue).subscribe(
      (res) => {
        this.localStorage.set('access_token', res);
        this.router.navigate(['home']);
      },
      (err) => {
        console.log(err);

        this.router.navigate(['/home']);
      }
    );
  }
  routeTo(e) {
    console.log(e);
  }
}

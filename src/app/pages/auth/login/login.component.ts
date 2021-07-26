import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { CiAuthService } from '@consult-indochina/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorLogin: any;
  loginForm: FormGroup;
  type = 'password';


  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private ciAuthService: CiAuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.ciAuthService.login(this.loginForm.value).subscribe(
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


  showPassword() {
    this.type = 'text';
  }

  hiddenPassword() {
    this.type = 'password';
  }
}

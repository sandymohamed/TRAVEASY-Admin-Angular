import { AuthAPIServiceService } from './../../services/auth-apiservice.service';
import { IUser } from '../../interfaces/iuser';
import { ICredentials } from '../../interfaces/icredentials';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.scss'],
})
export class LogginComponent implements OnInit {
  credentials: ICredentials = {} as ICredentials;
  user: IUser = {} as IUser;

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(
    private authService: AuthAPIServiceService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  logginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-zA-Z0-9]*$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
    ]),
  });
  onSubmit() {
    const observer = {
      next: (data: IUser) => {
        this.user = data;
        this.storageService.saveUser(data);
      },
      complete: () => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
    };
    if (this.logginForm.valid) {
      this.authService.loggin(this.logginForm.value).subscribe(observer);
    }
  }
  reloadPage(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });
      this.roles = [];
    }
  }
}

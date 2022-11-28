import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthAPIServiceService } from './services/auth-apiservice.service';
import { StorageService } from './services/storage.service';

interface SlideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'traveasy-client';
  isSlideBarCollapsed = false;
  screenWidth = 0;

  // auth
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private authService: AuthAPIServiceService
  ) {}

  onToggleSlideBar(data: SlideBarToggle): void {
    this.isSlideBarCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
  ngOnInit(): void {
    AOS.init();

    // auth
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

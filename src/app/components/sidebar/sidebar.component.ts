import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { AuthAPIServiceService } from '../../services/auth-apiservice.service';
import { StorageService } from '../../services/storage.service';

interface SlideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  collapsed: boolean = false;
  screenWidth = 0;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;



  @Output() onToggleSlideBar: EventEmitter<SlideBarToggle> = new EventEmitter();
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  closeSlideBar(): void {
    this.collapsed = false;
    this.onToggleSlideBar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
    }
  }
  constructor(
    private storageService: StorageService,
    private authService: AuthAPIServiceService
  ) {

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
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

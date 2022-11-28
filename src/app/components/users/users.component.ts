import { IUser } from './../../interfaces/iuser';
import { UserService } from './../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Statistics } from './../../interfaces/statistics';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  subscribers: any[] = [];
  statistics: Statistics = {} as Statistics;

  constructor(private userService: UserService,
    private toastr: ToastrService) {
    this.subscribers.push(
      this.userService.getAllUsers().subscribe((users) => {
        return (this.users = users);
      })
    );
  }

  ngOnInit(): void {
    this.subscribers.push(
      this.userService
        .getStatistics()
        .subscribe((statistics) => (this.statistics = statistics))
    );
  }

  removeUser(userId: string | number) {
    if (window.confirm('Are sure you want to delete this user ?')) {
      this.subscribers.push(
        this.userService.removeUser(userId).subscribe((message) => {
          this.toastr.success(`${message}`);
        })
      )
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }

  }

  ngOnDestroy(): void {
    this.subscribers.forEach((element: any) => {
      element.unsubscribe();
    });
  }
}

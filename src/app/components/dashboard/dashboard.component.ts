import { Statistics } from './../../interfaces/statistics';
import { IUser } from './../../interfaces/iuser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: IUser = {} as IUser;
  statistics: Statistics = {} as Statistics;
  subscription: any;
  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {
    this.currentUser = this.storageService.getUser();
  }

  ngOnInit(): void {
    this.subscription = this.userService
      .getStatistics()
      .subscribe((statistics) => (this.statistics = statistics));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log(this.statistics);
  }
}

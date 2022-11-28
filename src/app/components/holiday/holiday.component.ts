import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Icity } from 'src/app/interfaces/icity';
import { Iholiday } from 'src/app/interfaces/iholiday';
import { HolidayService } from 'src/app/services/holiday.service';
import { HotelsService } from 'src/app/services/hotels.service';
import { NotificationService } from 'src/app/services/notification.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  holidaysList: Iholiday[] = [];

  editMode: boolean = false;
  postMode: boolean = false;
  currentHolidayID: string = '';
  cities: Icity[] = [];

  // @ViewChild('holidayForm') form!: NgForm
  holidayForm: FormGroup;

  closeResult = '';

  constructor(
    private holidayService: HolidayService,
    private notifyService: NotificationService,
    private hotelService: HotelsService,
    private fb: FormBuilder,
    private modalService: NgbModal

  ) {

    this.holidayForm = this.fb.group({

      city: new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      description: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ),
      // img: new FormControl(
      //   '',
      // ),

      evaluation:
        new FormControl(['', [
          Validators.required,
          Validators.min(0),
          Validators.max(5)
        ]
        ]),
      period: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]
      ),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]
      ),
      // guide:new FormControl('', [
      //   Validators.required,
      // ]
      // ),
    });
  }

  // ng-modal :
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit(): void {
    this.holidayService.getHolodays().subscribe((data: any) => {
      this.holidaysList = data;
    });

    this.hotelService.getCities().subscribe((data: any) => {
      this.cities = data;

    });
  }

  showForm() {
    this.postMode = true;
  }

  handleSubmit(holiday: any) {

    const observer = {
      next: () => {
        this.notifyService.showSuccess("holiday updated successfully !!", "Notification")
        this.holidayForm.reset();
        this.holidayService.getHolodays().subscribe((data: any) => {
          this.holidaysList = data;

        });
      },
      error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
    };

    if (this.holidayForm.valid) {

      if (this.editMode) {

        this.holidayService.updateHoliday(this.currentHolidayID, holiday)
          .subscribe(observer)

      } else {
        this.holidayService.postHoliday(holiday).subscribe(observer)
        
      }
    } else {
      this.notifyService.showDanger("Not Valid Data !!", "Notification")
    }

  }


  handleEditBtn(id: any) {

    this.currentHolidayID = id;
    console.log(this.currentHolidayID);

    let currentHoliday = this.holidaysList.find((holiday) => { return holiday._id === id })
    this.holidayForm.patchValue({
      city: currentHoliday?.City,
      evaluation: currentHoliday?.Evaluation,
      // img: currentHoliday?.ImgURL,
      period: currentHoliday?.Period,
      description: currentHoliday?.Description,
      price: currentHoliday?.Price,
    })
    this.editMode = true;
  }

  handleDelete(id: any) {
    const observer = {
      next: () => {
        this.notifyService.showDanger("removed succesfully !!", "Notification")
        this.holidayService.getHolodays().subscribe((data: any) => {
          this.holidaysList = data;
        });
      },
      error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
    };
    if(confirm("Are you sure to delete ")) {
    this.holidayService.deleteHoliday(id).subscribe(observer);
    }
  }

}

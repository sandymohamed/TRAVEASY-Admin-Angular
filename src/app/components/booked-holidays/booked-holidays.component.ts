import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IBHoliday } from 'src/app/interfaces/ibholiday';
import { HolidayService } from 'src/app/services/holiday.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-booked-holidays',
  templateUrl: './booked-holidays.component.html',
  styleUrls: ['./booked-holidays.component.scss']
})
export class BookedHolidaysComponent implements OnInit {

  bookedList:IBHoliday[]= []
  // @ViewChild('form') form!: NgForm
  form: FormGroup ;

  isDisabled:boolean =true;
  editMode: boolean = false;
  
  currentHolidayId: string = '';

  closeResult = '';

  constructor(
    private holidayService : HolidayService,
    private notifyService: NotificationService,
    private fb : FormBuilder,
    private modalService: NgbModal

  ) { 
    this.form = this.fb.group({
      roomCount:new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0),
        ],
      ),
      adultCount:new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0),
        ],
      ),
      child:new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0),
        ],
      ), 
      isApprove:new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      startDate:new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      endDate:new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      // period:new FormControl('', [
      //   Validators.required,
      //   Validators.min(1),
      // ]
      // ),
     
      holidays:new FormControl('', [
        Validators.required,
      ]
      ),
      tourist:new FormControl('', [
        Validators.required,
      ]
      ),
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
    this.holidayService.getBookedHolodays().subscribe((data: any) => {
      this.bookedList = data;
    });
  }




handleSubmit(holiday: any) {
  const observer = {
    next: () => {
      this.notifyService.showSuccess("'booked holiday data updated successfully !!", "Notification")
      this.holidayService.getBookedHolodays().subscribe((data: any) => {
        this.bookedList = data;
      });
    },
    error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
  };
  if(this.form.valid){

    if (this.editMode) {    
    this.holidayService.updateBookedHolodays(this.currentHolidayId, holiday).subscribe(observer);

  }
  
}
  else{
    this.notifyService.showDanger("Not Valid Data !!", "Notification")
  }

}


handleEditBtn(id: any) {

  this.currentHolidayId = id;
  let currentHoloday = this.bookedList.find((holiday:any) => { return holiday._id === id })
  this.form.patchValue({
    roomCount  : currentHoloday?.RoomCount,    
  adultCount : currentHoloday?.AdultCount ,
  child : currentHoloday?.Child,
  period : currentHoloday?.Period,
  isApprove : currentHoloday?.IsApprove ,
  startDate: currentHoloday?.startDate,
  endDate: currentHoloday?.endDate,
  holidays : currentHoloday?.Holidays,
  tourist :currentHoloday?.Tourist,
  })
  console.log(this.form);

  this.editMode = true;


}




handleDelete(id: any) {
  const observer = {
    next: () => {
      this.notifyService.showDanger("removed succesfully !!", "Notification")
      this.holidayService.getBookedHolodays().subscribe((data: any) => {
        this.bookedList = data;
      });
    },
    error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
  };
  if(confirm("Are you sure to delete ")) {

  this.holidayService.deleteBookedHolodays(id).subscribe(observer);
  }
}


}
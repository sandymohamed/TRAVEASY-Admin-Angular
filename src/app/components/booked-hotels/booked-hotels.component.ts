import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IBHotel } from 'src/app/interfaces/ibhotel';
import { HotelsService } from 'src/app/services/hotels.service';
import { NotificationService } from 'src/app/services/notification.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-booked-hotels',
  templateUrl: './booked-hotels.component.html',
  styleUrls: ['./booked-hotels.component.scss']
})
export class BookedHotelsComponent implements OnInit {


  bookedList: IBHotel[] = []

  form: FormGroup
  isDisabled:boolean =true;

  editMode: boolean = false;
  currentHotelId: string = '';
  closeResult = '';

  constructor(
    private hotelService: HotelsService,
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private modalService: NgbModal

  ) {


    this.form = this.fb.group({
      // roomCount: new FormControl(
      //   '',
      //   [
      //     Validators.required,
      //     Validators.min(1),
      //   ]),
      adultCount: new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0),
        ]),
      child: new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0),
        ]),
      // period: new FormControl(
      //   '',
      //   [
      //     Validators.required,
      //     Validators.min(0),
      //   ]),
      single: new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0),
        ]),
      double: new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0),
        ]),
      isApprove: new FormControl(
        '',
        [
          Validators.required,
        ]),
      startDate: new FormControl(
        '',
        [
          Validators.required,
        ]),
      endDate: new FormControl(
        '',
        [
          Validators.required,
        ]),
      hotels: new FormControl(
        '',
        [
          Validators.required,
        ]),
      tourist: new FormControl(
        '',
        [
          Validators.required,
        ]),
  
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
    this.hotelService.getBookedHotels().subscribe((data: any) => {
      this.bookedList = data;
    });

    

  }
  


  handleSubmit(hotel: any) {
    const observer = {
      next: () => {
        this.notifyService.showSuccess("hotel data updated successfully !!", "Notification")
        this.hotelService.getBookedHotels().subscribe((data: any) => {
          this.bookedList = data;
        });
      },
      error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
    };

    if (this.form.valid) {
        this.hotelService.updateBookedHotels(this.currentHotelId, hotel).subscribe(observer);
    }
    else {

      this.notifyService.showDanger("Not Valid Data !!", "Notification")
      this.findInvalidControls()

    }

  }

  // check if there an invalid field 
  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log( invalid);
}

  handleEditBtn(id: any) {
    this.currentHotelId = id;
    let currentHotel = this.bookedList.find((hotel: any) => { return hotel._id === id })
    this.form.patchValue({
      // roomCount: currentHotel?.RoomCount,
      adultCount: currentHotel?.AdultCount,
      child: currentHotel?.Child,
      // period: currentHotel?.Period,
      single: currentHotel?.Single,
      double: currentHotel?.Double,
      isApprove: currentHotel?.IsApprove,
      startDate: currentHotel?.startDate,
      endDate: currentHotel?.endDate,
      hotels: currentHotel?.Hotels,
      tourist: currentHotel?.Tourist,
    })

    this.editMode = true;


  }




  handleDelete(id: any) {
    const observer = {
      next: () => {
        this.notifyService.showDanger("removed succesfully !!", "Notification")
        this.hotelService.getBookedHotels().subscribe((data: any) => {
          this.bookedList = data;
        });
      },
      error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
    };
    if(confirm("Are you sure to delete ")) {
    this.hotelService.deleteBookedHotels(id).subscribe(observer);
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Ihotel } from 'src/app/interfaces/ihotel';
import { HotelsService } from 'src/app/services/hotels.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Icity } from 'src/app/interfaces/icity';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotelsList: Ihotel[] = []


  form: FormGroup;
  editMode: boolean = false;
  postMode: boolean = false;
  currentHotelId: string = '';
  cities: Icity[] = [];
  closeResult = '';

  constructor(
    private hotelService: HotelsService,
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private modalService: NgbModal


  ) {

    this.form = this.fb.group({
      hotelName: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ),
      city: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ),
      // img: new FormControl(
      //   '',
      // ),

      evaluation:
        new FormControl(['', [
          Validators.required,
          Validators.min(0),
          Validators.max(5)]
        ]),
      // period: new FormControl('', [
      //   Validators.required,
      //   Validators.min(0),
      // ]
      // ),
      description: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ),
      lat: new FormControl('', [
        Validators.required,
      ]
      ),
      lon: new FormControl('', [
        Validators.required,
      ]
      ),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0)
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
    this.hotelService.getHotels().subscribe((data: any) => {
      this.hotelsList = data;
    });

    this.hotelService.getCities().subscribe((data: any) => {
      this.cities = data;
    });
  }
  showForm() {
    this.postMode = true;
  }

  handleSubmit(hotel: any) {

    const observer = {
      next: () => {
        this.notifyService.showSuccess("hotel updated successfully !!", "Notification")
        this.form.reset();
        this.hotelService.getHotels().subscribe((data: any) => {
          this.hotelsList = data;
        });
      },
      error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
    };

    if (this.form.valid) {

      if (this.editMode) {

        this.hotelService.updateHotel(this.currentHotelId, hotel).subscribe(observer);
      } else {
        this.hotelService.postHotel(hotel).subscribe(observer)
      }
    } else {
      this.notifyService.showDanger("Not Valid Data !!", "Notification")

    }

  }

  handleEditBtn(id: any) {

    this.currentHotelId = id;
    let currentHotel = this.hotelsList.find((hotel) => { return hotel._id === id })
    this.form.patchValue({
      hotelName: currentHotel?.HotelName,
      city: currentHotel?.City,
      evaluation: currentHotel?.Evaluation,
      // img: currentHotel?.ImgURL,
      // period: currentHotel?.Period,
      description: currentHotel?.Description,
      lat: currentHotel?.lat,
      lon: currentHotel?.lon,
      price: currentHotel?.Price

    })

    this.editMode = true;


  }




  handleDelete(id: any) {
    const observer = {
      next: () => {
        this.notifyService.showDanger("removed succesfully !!", "Notification")
        this.hotelService.getHotels().subscribe((data: any) => {
          this.hotelsList = data;
        });
      },
      error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
    };
    if(confirm("Are you sure to delete ")) {
    this.hotelService.deleteHotel(id).subscribe(observer);
  }}

}

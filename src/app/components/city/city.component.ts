import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Icity } from 'src/app/interfaces/icity';
import { HotelsService } from 'src/app/services/hotels.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  cityList: Icity[] =[];
  postMode: boolean = false;
  currentHolidayID: string = '';

  closeResult = '';

  form: FormGroup;
  constructor(
    private hotelService: HotelsService,
    private notifyService: NotificationService,
    private modalService: NgbModal,
    private fb: FormBuilder,


  ) {
    this.form = this.fb.group({
      City_Name: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
        )
      })

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
    this.hotelService.getCities().subscribe((data: any) => {
      this.cityList = data;
      console.log(  this.cityList);
      
    });
  }


  showForm() {
    this.postMode = true;
  }

  handleSubmit(city: any) {     
  
    const observer = {
      next: () => {
        this.notifyService.showSuccess("new city added successfully !!", "Notification")
        this.form.reset();
        this.hotelService.getCities().subscribe((data: any) => {
          this.cityList = data;
        });
      },
      error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
    };
    if (this.form.valid) {

      this.hotelService.postCities(city).subscribe(observer)
}
else {
  this.notifyService.showDanger("CITY NAME SHOULD BE ATLEAST 3 LETTERS !!", "Notification")

}
}


handleDelete(id: any) {
  const observer = {
    next: () => {
        this.notifyService.showDanger("removed succesfully !!", "Notification")
      this.hotelService.getCities().subscribe((data: any) => {
        this.cityList = data;
      });
    },
    error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
  };
  if(confirm("Are you sure to delete ")) {
  this.hotelService.deleteCity(id).subscribe(observer);
  }
}
}

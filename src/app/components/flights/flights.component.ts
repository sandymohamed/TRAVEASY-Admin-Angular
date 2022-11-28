import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IAirline } from 'src/app/interfaces/iairline';
import { IFlight } from 'src/app/interfaces/iflight';
import { Iflightpost } from 'src/app/interfaces/iflightpost';
import { Statistics } from 'src/app/interfaces/statistics';
import { AirlineServiceService } from 'src/app/services/airline-service.service';
import { FlightServiceService } from 'src/app/services/flight-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  FlightsList : IFlight[] = []
  AirlineList : IAirline[] = []
  closeResult = '';
  statistics: Statistics = {} as Statistics;
  subscription: any;
  form: FormGroup;
  page : number = 1

  constructor(private flightService :FlightServiceService ,
              private AirlineService : AirlineServiceService,
             private formBuil :FormBuilder ,
             private notifyService: NotificationService,
             private modalService: NgbModal ,
             private userService: UserService) { 

              this.form = this.formBuil.group({
                FlyingFrom: new FormControl(
                  '',
                  [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(25),
                  ],
                ),
                FlyingTo: new FormControl(
                  '',
                  [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(25),
                  ],
                ),
                DepartureDate: new FormControl(
                  '', [Validators.required]
                ),
          
                ReturnDate:
                  new FormControl(['', []
                  ]),               
                TravellerCount: new FormControl(
                  '',
                  [
                    Validators.required,
                    Validators.minLength(3),
                  ],
                ),
                Child: new FormControl('', [
                  Validators.required,
                ]
                ),
                Infant: new FormControl('', [
                  Validators.required,
                ]
                ),
                CabinClass: new FormControl('', [
                  Validators.required
                ]
                ),
                Price: new FormControl('', [
                  Validators.required
                ]
                ),
                NumberTickets: new FormControl('', [
                  Validators.required
                ]
                ),
                 Airline: new FormControl('', [
                  Validators.required
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
    this.flightService.getFlight(this.page).subscribe((data: any)=>{
      this.FlightsList = data ;
    });
    
    this.AirlineService.getAirline().subscribe((data:any)=>
    this.AirlineList = data)

    this.subscription = this.userService
    .getStatistics()
    .subscribe((statistics) => (this.statistics = statistics));


  }


  FunSubmit(Flights: Iflightpost) {
    
   console.log('Flight : ' + Flights);
    
    const observer = {
      next: () => {
        this.notifyService.showSuccess("Add successfully !!", "Notification")
        this.form.reset();
        this.flightService.getFlight(this.page).subscribe((data: any) => {
          this.FlightsList = data;
        });
      },
      error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
    };

    if (this.form.valid) {      
        this.flightService.postFlight(Flights).subscribe(observer)     
    } else {
      this.notifyService.showDanger("Not Valid Data !!", "Notification")

    }

  }

  handleClick(ev : string){
    this.page = ev == "Next" ? this.page + 1 :  this.page > 1 ? this.page - 1 : 1
    this.flightService.getFlight(this.page).subscribe((data: any)=>{
      this.FlightsList = data ;
    });    
  }

  FunPageNumber(page : number){
    this.page = page
    this.flightService.getFlight(this.page).subscribe((data: any)=>{
      this.FlightsList = data ;
    });    
  }

  // Fun Delete 
  handleDelete(id: any) {
    const observer = {
      next: () => {
        this.notifyService.showDanger("removed succesfully !!", "Notification")
        this.flightService.getFlight(this.page).subscribe((data: any) => {
          this.FlightsList = data;
        });
      },
      error: (err: Error) => this.notifyService.showDanger(err.message, "Notification"),
    };
    if(confirm("Are you sure to delete ")) {
    this.flightService.deleteFlight(id).subscribe(observer);
    }
  }


}
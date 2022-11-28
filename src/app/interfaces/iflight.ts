import { IAirline } from "./iairline";

export interface IFlight {
    _id:String,
    FlyingFrom : String,
    FlyingTo : String,
    DepartureDate  : Date,
    ReturnDate :Date,
    TravellerCount : Number,
    Child : Number ,
    Infant : Number ,
    CabinClass :String ,
    Price : Number ,     
    IsBooking : Boolean  ,
    NumberTickets : Number ,
    Airline : IAirline
   
}

import { IFlight } from "./iflight"
import { IUser } from "./iuser"

export interface IflightBooking {
    _id:String,
    IsBooking : Boolean ,
    BookingDate : Date,     
    // PassportNumber : String,   
    Tourist : IUser ,
    Flight : IFlight
       
}

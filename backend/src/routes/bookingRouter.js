import express from "express"
import {createOrder,verifyPayment,getUserBookings,getBookingDetails} from "../Controllers/bookingController.js"
import { protect } from "../Controllers/authController.js"

const bookingRouter=express.Router()
bookingRouter.get("/",protect,getUserBookings);
bookingRouter.get("/:bookingId",protect,getBookingDetails);
bookingRouter.post("/create-order",protect,createOrder);
bookingRouter.post("/verify-payment",protect,verifyPayment)
export {bookingRouter};


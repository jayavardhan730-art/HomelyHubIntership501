import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema(
    {
      property:{
              type: mongoose.Schema.ObjectId,
        ref:"Property",
        required:[true,"booking must belong to property"]
      },
      user:{
        type: mongoose.Schema.ObjectId,
        ref:"user",
        required:[true,"booking must belong to user"]


      },
      price:{
        type:Number,
        required:[true,"booking must price"]
      },
      createdAt:{
        type:Date,
        default:Date.now()

      },
      paid:{
        type:Boolean,
        default:true
      },
      fromDate:{
        type:Date,

      },
      toDate:{
        type:Date,
      },
      guest:{
        type:Number,

      },
      numberOfnights:{
       type:Number,

      }
    },
    {timestamp:true}

);


bookingSchema.pre(/^find/, function(){
    this.populate("user").populate({
    path:"property",
    select:"maximumGuest  images propertyName address"
    });
    
})

const Booking =mongoose.model("booking", bookingSchema)

export{Booking};
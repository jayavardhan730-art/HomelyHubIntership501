import slugify from "slugify";
import mongoose from "mongoose";
 

const propertySchema=new mongoose.Schema({
    propertyName:{
        type:String,
        required:[true, "enter your name"]
    },
    propertyType: {
    type: String,
    enum: ["House", "Flat", "Guesthouse", "Hotel"],
    default: "House",
},
    description:{
        type:String,
        required:[true,"add something"],

    },
    roomType: {
    type: String,
    enum: ["Anytype","Entire Home", "Room"]
},
    maximumGuest:{
        type:Number,
        required:[true,"enter no:of guest"],
    },
    amenities: [
  {
    name: {
      type: String,
      required: true,
      enum: [
        "Wifi",
        "Kitchen",
        "Tv",
        "Pool",
        "Ac",
        "Free Parking"
      ]
    },
    icon: {
      type: String,
      required: true
    }
  }
],
    images:{
        type:[
            {
            public_id:{
                type:String,
            },
            url:{
               type:String,
               required:true,
            }

        }
        ],
        validate:{
            validator:function(arr){
                return arr.length>=6;

            },
            message:"image must 6 images"
        }
    },
    price:{
        type:Number,
        required:[true,"enter price per night"],
        required:true,
        default:500,

    },
    address:{
        area:String,
        city:String,
        state:String,
        pincode:String,
    },
    currentBookings:[
         {
            bookingId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Booking"
            },
            fromDate:{
                type:Date,
            },
            toData:{
                type:Date,
            },
            userId:{
                type:mongoose.Schema.ObjectId,
                ref:"user"
            }

         }
    ],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    slug:String,
    checkInTime:{type:String, default:"10:00"},
    checkOutTime:{type:String, default:"12:00"}

});

propertySchema.pre("save", function () {
    this.slug = slugify(this.propertyName, { lower: true });
    
});

propertySchema.pre("save", function () {
    if (this.address && this.address.city) {
        this.address.city = this.address.city.toLowerCase().replaceAll(" ", "");
    }
    
});

const Property =mongoose.models.Property|| mongoose.model("Property", propertySchema);
export { Property };

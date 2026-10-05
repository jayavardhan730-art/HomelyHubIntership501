import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { router } from "./routes/userRoutes.js";
import connectDB from "./utils/db.js";
import { propertyRouter } from "./routes/propertyRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import {tripRouter} from "./routes/tripRouter.js";
import cors from "cors";
dotenv.config();

const app = express();
// express.json,urlencoded
app.use(express.json({limit:"1000mb"}))
app.use(express.urlencoded({limit:"1000mb",extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://homelyb.netlify.app"
    ],
    credentials: true
}));
  credentials:true
}))



const PORT = process.env.PORT ;


app.get('/', (req, res) => {
  res.send('app is sucessfully running');
});
app.use("/api/v1/rent/user",router)
app.use("/api/v1/rent/listing",propertyRouter);
app.use("/api/v1/rent/user/booking",bookingRouter);
app.use("/api/v1/rent/trip", tripRouter);
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

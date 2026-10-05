import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Please enter your name'],
            trim: true,
            maxlength:[50,'Name cannot exceed 50 characters'],


        },
        email:{
            type:String,
            required:[true,'Please enter your email'],
            unique:true,
            lowercase:true,
            trim:true,
            validate:[validator.isEmail,'Please enter a valid email']
        },
        password:{
            type:String,
            required:[true,'Please enter your password'],
            minlength:[6,'password should be greater than 6 characters'],
            select:false,

    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            validator:function(el){
                return el===this.password

            },
            message:'Password does not match'
    }
},
         phoneNumber:{
            type:String,
            required:[true],
            unique:true,

        },
         
            
             role:{
                enum:['user','admin'],
                type:String,
                default:'user'
             },
             avatar:{
              public_id:{
                type:String
                
              },
              url:{type:String}

              
             },
             passwordChangedAt:{
                type:Date
             },
             passwordResetToken:{
                type:String,
                select:false,
                index:true

             },
             passwordResetExpires:{
                type:String,
                select:true,

             },

    },
    {timestamps:true}
)
userSchema.set("toJSON",{
    transform:function(doc,ret){
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordChangedAt;
        delete ret.passwordResetExpires;
        delete ret.__v;
        return ret;
    }

}
)
userSchema.pre("save",async function(){
    if(!this.isModified("password")) return ;
    this.password= await bcrypt.hash(this.password, 12)
    this.passwordConfirm=undefined;


})
userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}
// userSchema.methods.changePasswordAfter=function(JWTTimestamp){
//     if(this.passwordChangedAt){
//         const changedTimestamp=parseInt(
//             this.passwordChangedAt.getTime()/1000,
//             10
//         );
//         return JWTTimestamp<changedTimestamp
//     }
//     return false;
// }

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    return false;
};

userSchema.methods.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString("hex");
        this.passwordResetToken=crypto.createHash("sha256")
        .update(resetToken)
        .digest("hex");
        this.passwordResetExpires=Date.now()+10*60*1000;
        return resetToken;

    
}
const User=mongoose.model("user",userSchema);
export {User};

import {userActions} from "./user-slice";
import {axiosInstance} from "../../utils/axios";

export const getSignUp =(user) => async(dispatch)=>{
    try{
        dispatch(userActions.getSignupRequest());
        const {data} = await axiosInstance.post("/v1/rent/user/signup", user);
        dispatch(userActions.getSignupDetails(data.user))

    }catch(error){
        dispatch(userActions.getError(error.response.data.message))

    }
}

export const getLogin =(user) => async(dispatch)=>{
    try{
        dispatch(userActions.getLoginRequest());
        const {data} =await axiosInstance.post("/v1/rent/user/login", user);
        dispatch(userActions.getLoginDetails(data.user))

    }catch(error){
        dispatch(userActions.getError(error.response.data.message))

    }
}

export const currentUser = () => async (dispatch) => {
  try {
    dispatch(userActions.getCurrentRequest());

    const { data } = await axiosInstance.get("/v1/rent/user/me");

    console.log("CURRENT USER:", data);

    dispatch(userActions.getCurrentUser(data.user));

  } catch (error) {
    console.log("CURRENT USER ERROR:", error.response?.data);

    dispatch(userActions.getLogout(null));
  }
};

/*export const updateUser =(updateUser)=> async(dispatch)=>{
    try{
     dispatch(userActions.getUpdateUserRequest());
     const response = await axiosInstance.patch("/v1/rent/user/updateMe", updateUser);
     console.log(response)
     const {data} = await axiosInstance.get("/v1/rent/user/me")
     dispatch(userActions.getCurrentUser(data.user));
    }catch(error){
         dispatch(userActions.getError(error.response.data.message))


    }
}*/

export const updateUser = (updateData) => async (dispatch) => {
  try {
    dispatch(userActions.getUpdateUserRequest());

    const { data } = await axiosInstance.patch(
      "/v1/rent/user/updateMe",
      updateData
    );

    console.log("UPDATE USER RESPONSE:", data);

    // Backend returns:
    // {
    //   status: "Success",
    //   data: {
    //     user: updatedUser
    //   }
    // }

    dispatch(userActions.getCurrentUser(data.data.user));

    return data.data.user;

  } catch (error) {
    console.log(
      "UPDATE USER ERROR:",
      error.response?.data || error.message
    );

    dispatch(
      userActions.getError(
        error.response?.data?.message || "Profile update failed"
      )
    );

    return null;
  }
};

export const forgotPassword =(email)=> async(dispatch)=>{
    try{
        await axiosInstance.post("/v1/rent/user/forgotPassword",{email}) 

    }catch(error){
     dispatch(userActions.getError(error.response.data.message))



    }
}

export const resetPassword = (repassword, token)=> async(dispatch)=>{
    try{
        await axiosInstance.patch(`/v1/rent/user/resetPassword/${token}`,repassword)


    }catch(error){
        dispatch(userActions.getError(error.response.data.message))

    }
}

export const updatePassword = (password) => async(dispatch)=>{
    try{
        dispatch(userActions.getPasswordRequest());
        await axiosInstance.patch("/v1/rent/user/updateMyPassword",password)
        dispatch(userActions.getPasswordSuccess(true))

    }catch(error){
        dispatch(userActions.getError(error.response.data.message))


    }
}

export const logout =()=> async(dispatch)=>{
    try{
        await axiosInstance.get("/v1/rent/user/logout")
        dispatch(userActions.getLogout(null));

    }catch(error){
         dispatch(userActions.getError(error.response.data.message))


    }
};
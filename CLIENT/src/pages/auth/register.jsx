import CommonForm from "@/components/common/form";
import { registerFormConttrols } from "@/config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
const dispatch =useDispatch();
const navigate=useNavigate();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast.success(data.payload.message || "Registration successful!");
        navigate('/auth/login');
      }else{
        toast.error(data.payload.message || "Registration failed",{
          description: "Please try again.",
          duration: 4000,
          important: true,       
          
        }
    )}
    });
    
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p>
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormConttrols}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;

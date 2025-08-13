import CommonForm from "@/components/common/form";
import { loginFormConttrols } from "@/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      const payload = data?.payload;
      const success = payload?.success;
      const message = payload?.message;
  
      if (success) {
        toast.success(message || "Welcome back");
      } else {
        toast.error(message || "Something went wrong", {
          description: "Please try again.",
          duration: 4000,
          important: true,
          variant: "destructive",
        });
      }
    }).catch((err) => {
      // Optional catch block to handle unexpected errors
      toast.error("Login failed", {
        description: err?.message || "Please try again later",
      });
    });
  }
  
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p>
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            {" "}
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormConttrols}
        buttonText={"Sign in"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;

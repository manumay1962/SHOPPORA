import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";

import { useNavigate } from "react-router-dom";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currentItem) => {
          const price =
            currentItem?.salePrice && currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price;
          return sum + price * (currentItem?.quantity || 1);
        }, 0)
      : 0;
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className=" space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
          : null}
      </div>
      <div className="  space-y-4">
        <div className="flex justify-between p-4">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={() =>{
           navigate("/shop/checkout")
           setOpenCartSheet(false)
        }} className=" w-[90%]">
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;

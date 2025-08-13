import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleCartDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item deleted", {
          duration: 3000,
          icon: "🛒",
          position: "bottom-right",
          style: {
            background: "#f0f4ff",
            color: "#1e3a8a",
            border: "1px solid #c7d2fe",
            borderRadius: "12px",
            fontWeight: "500",
            padding: "12px 16px",
          },
        });
      }
    });
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item updated", {
          duration: 3000,
          icon: "🛒",
          position: "bottom-right",
          style: {
            background: "#f0f4ff",
            color: "#1e3a8a",
            border: "1px solid #c7d2fe",
            borderRadius: "12px",
            fontWeight: "500",
            padding: "12px 16px",
          },
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg shadow-sm">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded-lg object-cover object-top flex-shrink-0"
      />
      <div className="flex-1">
        <h3 className="font-extrabold text-gray-800">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            disabled={cartItem.quantity === 1}
            className="h-8 w-8 rounded-full"
            aria-label="Decrease quantity"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            aria-label="Increase quantity"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-gray-900">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartDelete(cartItem)}
          className="cursor-pointer mt-1 text-red-500 hover:text-red-700"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;

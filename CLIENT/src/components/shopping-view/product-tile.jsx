import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) {
  return (
    <Card className="sm:max-w-[240px] w-full mx-auto overflow-hidden flex flex-col shadow-sm border  rounded-lg p-0">
      <div
        className="relative w-full h-[230px]"
        onClick={() => handleGetProductDetails(product._id)}
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover object-top"
        />
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Out Of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {`Only ${product?.totalStock} items left`}
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        ) : null}
      </div>

      <CardContent className="p-2 flex-1 flex flex-col justify-between gap-1">
        <h2 className="text-sm font-semibold leading-tight truncate">
          {product?.title}
        </h2>

        <div className="flex justify-between text-[13px] text-muted-foreground">
          <span>{categoryOptionsMap[product?.category]}</span>
          <span>{brandOptionsMap[product?.brand]}</span>
        </div>

        <div className="flex justify-between items-center mt-1">
          <span
            className={`text-sm font-medium ${
              product?.salePrice > 0
                ? "line-through text-gray-400"
                : "text-primary"
            }`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-sm font-semibold text-primary">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-2 pb-2">
        {product?.totalStock === 0 ? (
          <Button
            onClick={() => handleAddToCart(product?._id)}
            className="w-full h-8 text-xs opacity-60 cursor-not-allowed"
            disabled={product?.totalStock === 0}
          >
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product?._id,product?.totalStock)}
            className="w-full h-8 text-xs"
            
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;

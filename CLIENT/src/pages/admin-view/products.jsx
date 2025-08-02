import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElement } from "@/config";

import React, { Fragment, useState } from "react";
import ProductImageUpload from "./image-upload";


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function Adminproducts() {
  const [openCreateProductsDialog, setopenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setuploadedImageUrl] = useState("");

  const[imageLoadingState,setimageLoadingState]=useState(false)

  function onSubmit() {
    
   
  }
  console.log(formData,'formData');
  

  return (
    <Fragment>
      {/* Ensure outermost container has overflow-x-hidden */}
      <div className="mb-5 w-full flex justify-end overflow-x-hidden">
        <Button onClick={() => setopenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 overflow-x-hidden"></div>

      {/* Sheet for Add Product */}
      <Sheet 
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setopenCreateProductsDialog(false);
        }}
      >
        <SheetContent aria-describedby={undefined}
          side="right"
          className="overflow-y-auto overflow-x-hidden max-w-md w-full"
        >
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">
              Add New Product
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setuploadedImageUrl={setuploadedImageUrl}
            setimageLoadingState={setimageLoadingState}
            imageLoadingState={imageLoadingState}
          />

          <div className="px-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              buttonText="Add"
              setFormData={setFormData}
              formControls={addProductFormElement}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default Adminproducts;

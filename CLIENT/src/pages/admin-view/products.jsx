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


const initialFormData={
  image:null,
  title:'',
  description:'',
  category:'',
  brand:'',
  price:'',
  salePrice:'',
  totalStock:'',
}

function Adminproducts() {
  const [openCreateProductsDialog, setopenCreateProductsDialog] =
    useState(false);

    const[formData,setFormData]=useState(initialFormData);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setopenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 "> </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setopenCreateProductsDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <div className="py-6"><CommonForm formData={formData} buttonText='Add' setFormData={setFormData} formControls={addProductFormElement}/></div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default Adminproducts;

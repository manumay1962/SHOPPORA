import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElement } from "@/config";

import React, { Fragment, useEffect, useState } from "react";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import { toast } from "sonner";
import AdminProductTile from "@/components/admin-view/product-tile";
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
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [imageLoadingState, setimageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setopenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts()), setImageFile(null);
            setopenCreateProductsDialog(false);
            setFormData(initialFormData);
            toast.success("Product added sucessfully");
          }
        });
  }

  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct(getCurrentProductId)).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
      }
    })
  }
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log(productList, "productList");

  return (
    <Fragment>
      {/* Ensure outermost container has overflow-x-hidden */}
      <div className="mb-5 w-full flex justify-end overflow-x-hidden">
        <Button onClick={() => setopenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 overflow-x-hidden">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                setFormData={setFormData}
                setopenCreateProductsDialog={setopenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      {/* Sheet for Add Product */}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setopenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          aria-describedby={undefined}
          side="right"
          className="overflow-y-auto overflow-x-hidden max-w-md w-full"
        >
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">
              {currentEditedId !== null ? "Edit Product" : " Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setuploadedImageUrl={setuploadedImageUrl}
            setimageLoadingState={setimageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="px-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
             
              setFormData={setFormData}
              formControls={addProductFormElement}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default Adminproducts;

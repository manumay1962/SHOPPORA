const { ImageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product-model");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error occured",
    });
  }
};

//add new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Error occurs in products",
    });
  }
};

//fetch product
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      sucess: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Error occurs in fetching  products",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.salePrice = salePrice == '' ? 0 :salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.price = price == '' ? 0 :price || findProduct.price;

    await findProduct.save();

    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Error occurs in editing products",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {

    const{id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    if(!product) res.status(404).json({
        success:false,
        message:'Product not found'
    })
        res.status(200).json({
            success:true,
            message:'Product deleted succesfully'
        })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Error occurs in deletion products",
    });
  }
};
module.exports = {
  handleImageUpload,
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
};

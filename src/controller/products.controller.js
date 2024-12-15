import path from "path";
import ProductModel from "../models/products.model.js";
export default class ProductController {
  getProducts(req, res) {
    const products = ProductModel.get();

    return res.render("product", { products });
  }
  getAddFrom(req, res) {
    return res.render("new-products", { error: null });
  }

  submit(req, res) {
    ProductModel.addProduct(req.body);
    const products = ProductModel.get();
    return res.render("product", { products });
  }
  updateProduct(req, res) {
    // if product exits we will render update-product view
    let { id } = req.params;
    let currProduct = ProductModel.getId(id);
    if (currProduct) {
      return res.render("update-product", {
        currProduct: currProduct,
        error: null,
      });
    }
    //if it is not present we will send error message
    else {
      return res.status(404).send("Product not found");
    }
  }
  updatePost(req, res) {
    ProductModel.update(req.body);
    const products = ProductModel.get();

    return res.render("product", { products });
  }
  deleteProduct(req,res)
  {
    let {id}=req.params;
    ProductModel.delete(id);
    const products = ProductModel.get();

    return res.render("product", { products });
  }
}

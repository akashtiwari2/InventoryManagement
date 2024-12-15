import express from "express";
import ProductController from "./src/controller/products.controller.js";
import ejsview from "express-ejs-layouts";
import path from "path";
import validation from "./middlewares/validation.middleware.js";
const server = express();

//parse from data

server.use(express.urlencoded({extended:true}))

//seting view engine  using middleware
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(ejsview);

const ProductControllerObj = new ProductController();
server.get("/", ProductControllerObj.getProducts);
server.get("/update_product/:id",ProductControllerObj.updateProduct)
server.get("/new", ProductControllerObj.getAddFrom);
server.post('/',validation,ProductControllerObj.submit)
server.post('/update_product',ProductControllerObj.updatePost)
server.get('/delete_product/:id',ProductControllerObj.deleteProduct)
server.use(express.static("src/views"));
server.listen(3400);

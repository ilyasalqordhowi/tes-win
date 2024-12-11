const router = require("express").Router();
const UserController = require("../controller/user");
const ProductController = require("../controller/product");

router.get("/products", ProductController.list);
router.get("/product/:id", ProductController.getById);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/products", ProductController.create);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);
module.exports = router;

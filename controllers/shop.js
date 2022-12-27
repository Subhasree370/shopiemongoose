const Product = require("../models/product");
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((products) => {
      res.render("shop/product-detail", {
        product: products,
        pageTitle: products.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

// exports.getIndex = (req, res, next) => {
//   Product.findAll()
//     .then(products => {
//       res.render('shop/index', {
//         prods: products,
//         pageTitle: 'Shop',
//         path: '/'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId", "title")
    // .execPopulate()
    .then((user) => {
      console.log(user.cart.items);
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .deleteItemFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrders = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    // .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((prod) => {
        return { product: { ...prod.productId._doc }, quantity: prod.quantity };
      });
      // console.log(products);
      const order = new Order({
        products: products,
        user: {
          usedId: req.user._id,
          name: req.user.name,
          email: req.user.email,
        },
      });
      return order.save();
    })
    .then(() => {
      req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }).then((orders) => {
    console.log(orders[0].products);
    res.render("shop/orders", {
      orders: orders,
      pageTitle: "Yours Order",
      path: "/orders",
    });
  });
};

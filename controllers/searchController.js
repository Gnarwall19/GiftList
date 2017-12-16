var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var gift = require("../models/gift.js");
var user = require("../models/user.js");
var manipulateData = require("./helpers.js");
var cloudinary = require("./imghelper");
// Create all our routes and set up logic within those routes where required.

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/post", function(req, res) {
  res.render("post");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.get("/upload/:file", function(req, res) {
  var file = req.params.file;
  var uploaded = cloudinary(file);
  res.json(uploaded);
});

router.get("/search/:search", function(req, res) {
  var searched = req.params.search;
  console.log(searched);
  var finalSent = {};
  gift.searched(searched, function(data) {
    var hbsObject = {
      gifts: data
    };
    res.render("list", hbsObject);
  });
});

// router.get("/results", function(req, res) {
//   var vals = res.locals.finalArray;
//   gift.searched(vals, function returnDataToController(data) {
//     res.json(data);
//   });
// });
router.get("/list", function(req, res) {
  gift.all(function returnDataToController(data) {
    var info = { gifts: [] };

    for (var i = 0; i < data.length; i += 1) {
      // Get the current gift.
      var currentGift = data[i];
      info.gifts.push(currentGift);
    }
    console.log(info);
    //console.log(info);
    res.render("list", info);
  });
});

router.get("/all", function(req, res) {
  gift.all(function returnDataToController(data) {
    var hbsObject = {
      gifts: data
    };
    // res.render("index");
    // console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.post("/gift", function(req, res) {
  // gift.create()
  var cols = "title, city_state, category, contact, item_description, img_link";
  var vals = [
    req.body.itemTitle,
    req.body.location,
    req.body.category,
    req.body.contact,
    req.body.description,
    req.body.upload
  ];
  gift.create(cols, vals, function returnDataToController(result) {
    res.json({ result });
  });
});

router.get("/users", function(req, res) {
  user.all(function returnDataToController(data) {
    var hbsObject = {
      users: data
    };
    res.json(data);
  });
});

router.post("/user/new", function(req, res) {
  var cols = "user_name, phone, email, pass_word";
  var vals = [req.body.name, req.body.phone, req.body.email, req.body.pass];
  console.log(vals);
  user.create(cols, vals, function returnDataToController(result) {
    res.json({ result });
  });
});

router.get("/item/:id", function(req, res) {
  var id = parseInt(req.params.id);
  gift.findOne(id, function returnDataToController(result) {
    var hbsObject = result[0];
    console.log(hbsObject);
    // res.render("item", result);
    res.render("item", hbsObject);
  });
});

// router.get("*", function(req, res) {
//   res.render("index");
// });
module.exports = router;

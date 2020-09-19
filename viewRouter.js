const express = require("express");
const viewController = require("./viewController");
const authController = require("./authController");
const catchAsync = require("./catchAsync");

const router = new express.Router();
router.use(authController.isLoggedIn);
router.get("/", viewController.renderHomepage);

module.exports = router;

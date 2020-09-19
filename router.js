const express = require("express");
const movieController = require("./moviesController");
const authController = require("./authController");

const userRouter = new express.Router();

userRouter.post("/signUp", authController.signUp);
userRouter.post("/login", authController.login);
userRouter.get("/me", authController.protect, authController.myDetails);

const movieRouter = new express.Router();
movieRouter.get("/download", movieController.downloadPosters);
movieRouter.get("/", movieController.getAllMovies);
movieRouter.get("/stats", movieController.overallStats);
movieRouter.get("/search/:query", movieController.searchMovie);
movieRouter.use(authController.protect);
movieRouter
	.route("/:id")
	.get(movieController.getMovie)
	.patch(movieController.updateMovie)
	.delete(movieController.deleteMovie);
movieRouter.route("/").post(movieController.createMovie);

module.exports = { movieRouter, userRouter };

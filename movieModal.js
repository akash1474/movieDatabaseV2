const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: [true, "Title of the movie must be unique"],
            required: [true, "A movie must have a title"],
            trim: true,
        },
        category: {
            type: String,
            required: [true, "A movie must have a category property!!!"],
            enum: ["tv", "movie"],
        },
        releaseDate: {
            type: Date,
            required: [true, "A movie must have a releaseDate property"],
        },
        downloadedOn: {
            type: Date,
            default: Date.now(),
        },
        movieId: {
            type: Number,
            required: [true, "A movie must have a movieId property"],
            unique: [true, "movieId must be unique!!!"],
        },
        posterPath: {
            type: String,
            required: [true, "A movie must have a posterPath property!!!!"],
        },
        genres: [
            {
                id: Number,
                name: String,
            },
        ],
        overview: {
            type: String,
            required: [true, "A movie must have a overview property!!!"],
        },
        voteAverage: {
            type: Number,
            required: [true, "A movie must have a voteAverage property!!!!"],
        },
        size: {
            type: Number,
            required: [true, "A movie must have a size!!!"],
        },
        quality: {
            type: String,
            required: [true, "A movie must have a quality"],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

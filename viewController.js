const Axios = require("axios");
const Movie = require("./test");
exports.renderHomepage = async (req, res, next) => {
    var data = await Axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`
    );
    const overall = [
        {
            _id: "movie",
            totalCount: 0,
            totalSize: 0,
        },
        {
            _id: "tv",
            totalCount: 0,
            totalSize: 0,
        },
    ];
    const movies = await Movie.find();
    let info = await Movie.aggregate([
        {
            $group: {
                _id: "$category",
                totalCount: { $sum: 1 },
                totalSize: { $sum: "$size" },
            },
        },
    ]);

    if (info.length === 0) {
        info = overall;
    }
    if (info.length === 1) {
        info.push({
            totalSize: 0,
            totalCount: 0,
        });
    }

    res.status(200).render("index", {
        data: movies,
        trending: data.data.results,
        overallStats: [
            info[info.findIndex((el) => el._id === "tv")],
            info[info.findIndex((el) => el._id === "movie")],
        ],
    });
};

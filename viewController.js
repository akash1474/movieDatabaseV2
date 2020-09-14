const Axios =require('axios');
const Movie=require('./test');
exports.renderHomepage = async (req, res, next) => {
	var data = await Axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`);
    const movies = await Movie.find();

    res.status(200).render('index', {
        data: movies,
        trending:data.data.results,
    });
};

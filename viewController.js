const Axios =require('axios');
const Movie=require('./test');
exports.renderHomepage = async (req, res, next) => {
	// var data = await Axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`);
    const overall=[
        {
            _id:"movie",
            totalCount:0,
            totalSize:0,
        },
        {
            _id:"tv",
            totalCount:0,
            totalSize:0,
        }
    ];
    const movies = await Movie.find();
let info=await Movie.aggregate([{
              $group:{
                                                    _id:'$category',
                                                    totalCount:{$sum:1},
                                                    totalSize:{$sum:'$size'}
                                                }
                                        }]);

    if(info.length===0){
        info=overall;
    }
    res.status(200).render('index', {
        data: movies,
        trending:[],
        overallStats:info,
    });
};

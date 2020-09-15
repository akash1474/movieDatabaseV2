const Movie = require('./test');
const catchAsync = require('./catchAsync');
const AppError=require('./appError');
const fs=require('fs');
const Zip=require('node-zip');
request = require('request');
exports.overallStats=catchAsync(async(req,res,next)=>{
    const data=await Movie.aggregate([{
                                            $group:{
                                                    _id:'$category',
                                                    totalCount:{$sum:1},
                                                    totalSize:{$sum:'$size'}
                                                }
                                        }]);
    res.status(200).json({
        status:"success",
        data,
    });
})

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(`./images/${filename}`)).on('close', callback);
  });
};


exports.downloadPosters=catchAsync(async(req,res,next)=>{
    const movies=await Movie.find();
    let zip=new Zip();    
    await movies.forEach(async(movie)=>{
       await download(`https://image.tmdb.org/t/p/w500${movie.posterPath}`,`${movie.id}.jpg`,()=>{
            console.log("Done");
        });
    })

    const data=fs.readdirSync('./images');
    await data.forEach(async(file)=>{
        const fileData=fs.readFileSync(`./images/${file}`);
        await zip.file(file,fileData)
    });
    var options = {base64: false, compression:'DEFLATE'};
    fs.writeFile('moviesPoster.zip', zip.generate(options), 'binary', function (error) {
    res.download('moviesPoster.zip');
            });
});

exports.createMovie = catchAsync(async (req, res, next) => {
    const title=req.body.title;
    const test=await Movie.find({title});
    if(test.length>=1){
        return next(new AppError("Movie already exists in the database!!!",404));
    }
    const movie = await Movie.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            movie,
        },
    });
});

exports.getMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            movie,
        },
    });
});

exports.getAllMovies = catchAsync(async (req, res, next) => {
    const queryObj = { ...req.query };
    //Filtering
    const exFields = ['page', 'sort', 'limit', 'fields'];
    exFields.forEach((el) => delete queryObj[el]);

    //Advanced Filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|lt|lte|gt)\b/g, (m) => `$${m}`);
    let movie = Movie.find(JSON.parse(queryString));

    //sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        movie = movie.sort(sortBy);
    } else {
        movie = movie.sort('-downloadedOn');
    }

    //field limiting

    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        movie = movie.select(fields);
    } else {
        movie = movie.select('-_v');
    }

    //pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;
    movie = movie.skip(skip).limit(limit);

    const data = await movie;

    res.status(200).json({
        status: 'success',
        results: data.length,
        data,
    });
});

exports.searchMovie=catchAsync(async(req,res,next)=>{
    const movies=await Movie.find({title:req.params.query});

    res.status(200).json({
        status:"success",
        data:movies,
    })
});

exports.updateMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            movie,
        },
    });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
    await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: 'success',
        message: 'Movie DB delete Successfully!!!',
    });
});

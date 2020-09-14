const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const AppError = require('./appError');
const app = express();

const { movieRouter, userRouter } = require('./router');
const viewRouter = require('./viewRouter');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((req,res,next)=>{
	res.setHeader('Content-Security-Policy',"img-src * data:")
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', viewRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/users', userRouter);

app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use((err, req, res, next) => {
    console.log('Error was encountered!!!');
    console.log(err.status, err.message);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
module.exports = app;

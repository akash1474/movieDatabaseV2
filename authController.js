const jwt = require('jsonwebtoken');
const {promisify}=require('util');

const User=require('./userModal');
const AppError=require('./appError');
const catchAsync=require('./catchAsync');


const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOpts = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOpts.secure = true;
  }
  res.cookie('jwt', token, cookieOpts);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signUp=async(req,res,next)=>{
	const newUser=await User.create({
		name:req.body.name,
		email:req.body.email,
		password:req.body.password,
		passwordConfirm:req.body.passwordConfirm,
	});

	createSendToken(newUser, 201, res, req);

};


exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1]CHECK IF EMAIL AND PASSWORD EXISTS
  if (!email || !password) {
    return next(new AppError('Please provide email and password!!', 400));
  }
  //2]CHECK IF THE USE EXISTS AND ALSO THE PASSWORD IS CORRECT
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res, req);
});

exports.isLoggedIn=catchAsync(async(req,res,next)=>{
  res.locals.user="";
  if(req.cookies.jwt){
    const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.SECRET_KEY);

    const currentUser=await User.findById(decoded.id);

    if(!currentUser){
      return next();
    }
    res.locals.user="Hello! Akash";
    return next();
  }

  next();  

});

exports.protect = catchAsync(async (req, res, next) => {
  //1]GETTING THE TOKEN AND CHECK
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in.Please login to get access', 401)
    );
  }
  //2]VERIFY TOKEN
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  //3]CHECK IF USER STILL EXISTS
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does not exits!!!', 401)
    );
  }

  //GRANT ACCESS TO PROTECTED ROUTE
  res.locals.user = currentUser;
  req.user = currentUser;
  next();
});

exports.myDetails=catchAsync(async(req,res,next)=>{

    const user=await User.findById(req.user.id);

    res.status(200).json({
      status:"Success",
      data:{
        user,
      }
    });
});
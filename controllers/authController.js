const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/error");
const Nexmo = require("nexmo");
const nexmo = new Nexmo({
  apiKey: "cdd90379",
  apiSecret: "sPJm9F1TPM8xrbmq"
});
//
//
//JWT that Expires in 30 minutes
const signtoken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30m"
  });
};
//
//
//
//
//
//
exports.signup = catchAsync(async (req, res, next) => {
  const verfCode = Math.floor(Math.random() * 1000000 + 1);
  req.body.verificationCode = verfCode;

  let newUser = await User.findCreateFind({
    where: { Phone: req.body.Phone },
    defaults: req.body
  });
  await nexmo.message.sendSms(
    "BazrganTeam",
    `964${newUser[0].dataValues.Phone}`,
    `Hi , You Verification Code is ${verfCode}`
  );
  res.status(200).json({
    status: "success",
    data: "Message has been Sent to your Phone"
  });
});

exports.validateTokenAgain = catchAsync(async (req, res, next) => {
  const refreshToken = req.body.token;
  const UserFind = await User.findOne({
    where: { id: req.body.id },
    hooks: false
  });
  if (refreshToken == null)
    next(new AppError(`Please Provide Refresh token`, 404));
  if (!UserFind.RefreshToken == refreshToken)
    next(new AppError(`You Dont Have Access`, 400));

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) next(err);
    const accessToken = signtoken(user.id);

    res.status(200).json({
      status: "success",
      data: "Your New Token is Here",
      Token: accessToken
    });
  });
});

exports.verifySMS = catchAsync(async (req, res, next) => {
  const UserFind = await User.findOne({
    where: { Phone: req.body.phone },
    hooks: false
  });
  if (UserFind) {
    if (UserFind.verificationCode == req.body.vcode) {
      UserFind.active = true;
      UserFind.verificationCode = 0;
      let refreshToken = jwt.sign(
        { id: UserFind.id },
        process.env.REFRESH_TOKEN_SECRET
      );
      UserFind.RefreshToken = refreshToken;
      UserFind.save();
      let token = signtoken(UserFind.id);

      res.status(201).json({
        status: "success",
        data: {
          token,
          refreshToken
        }
      });
    } else {
      return next(
        new AppError(
          "Verification Failed, please Make sure of the Confirmation Code",
          400
        )
      );
    }
  } else {
    return next(new AppError("Couldn't Find The user", 400));
  }
});

exports.SendAgainSMS = catchAsync(async (req, res, next) => {
  let data;
  const UserFind = await User.findOne({
    where: { Phone: req.params.id },
    hooks: false
  });

  if (UserFind || UserFind != null) {
    if (UserFind.active === 1 && UserFind.verificationCode === 0) {
      data = "Account is already Verified";
    } else {
      const verfCode = Math.floor(Math.random() * 1000000 + 1);
      UserFind.verificationCode = verfCode;
      UserFind.save();
      const from = "BazrganTeam";
      const to = `964${UserFind.Phone}`;
      const text = `Hi , You Verification Code is ${verfCode}  `;
      await nexmo.message.sendSms(from, to, text);
      data = "Code is sent again";
    }
  } else {
    return next(new AppError("user not found", 400));
  }

  res.status(200).json({
    status: "success",
    data
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const phone = req.body.Phone;
  //1) if email and pass exist
  if (!phone) {
    return next(new AppError("Please provide phone Number", 400));
  }
  //2) check if user exist && password is correct (search within the database)
  const user = await User.findOne({ where: { Phone: phone }, hooks: false });
  if (!user) {
    return next(new AppError("Incorrect Phone Number", 401));
  }
  //3) if everything ok , send the token to
  let verfcode = Math.floor(Math.random() * 1000000 + 1);
  user.LoginCode = verfcode;
  user.save();

  const from = "BazrganTeam";
  const to = `00964${phone}`;
  const text = `Hi , You Login Code is ${verfcode}`;
  await nexmo.message.sendSms(from, to, text);

  res.status(200).json({
    status: "success",
    data: "check your Phone for Login Code"
  });
});

exports.logout = catchAsync(async (req, res) => {
  const UserFind = await User.findOne({
    where: { id: req.params.id },
    hooks: false
  });
  UserFind.RefreshToken = null;
  UserFind.save();
  res.cookie("jwt", "logged out", {
    expires: new Date(Date.now + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: "success" });
});

exports.loginSMS = catchAsync(async (req, res, next) => {
  const phone = req.body.Phone;
  if (!phone) {
    return next(new AppError("Please provide phone Number", 400));
  }
  const user = await User.findOne({ where: { Phone: phone } });
  if (!user) {
    return next(new AppError("Incorrect Phone Number", 401));
  }
  if (user.LoginCode == req.body.loginCode) {
    let refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET
    );
    user.RefreshToken = refreshToken;
    user.LoginCode = null;
    user.save();
    let token = signtoken(user.id);

    res.status(201).json({
      status: "success",
      data: {
        token,
        refreshToken
      }
    });
  } else {
    return next(new AppError("Not Valid Code", 401));
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("Error occurred: you are not authenticated", 401));
  }
  //2) verfication the signtoken
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3) check if user still exist
  const freshUser = await User.findOne({ where: { id: decoded.id } });
  if (!freshUser) {
    return next(
      new AppError("the token Belong to this user does not exist", 401)
    );
  }

  //grant access to protected routes
  req.user = freshUser;
  res.locals.user = freshUser;
  req.UserDetails = freshUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you don't have permission to do this Action", 403)
      );
    }
    next();
  };
};

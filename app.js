const express = require('express');
require('dotenv').config()
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const passport = require('passport');
const cookieParser = require('cookie-parser');

const userAuth = require('./apis/user/servicesUser');
const userQuestion = require('./apis/question/servicesUser');
const userData = require('./apis/data/serviceUser');

const adminAuth = require('./apis/user/servicesAdmin');
const adminDomain = require('./apis/domain/servicesAdmin');
const adminAlgorithm = require('./apis/algorithm/servicesAdmin');
const adminQuestion = require('./apis/question/servicesAdmin');
const adminModelInfo = require('./apis/modelInfo/servicesAdmin');

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.db,{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });
mongoose.set('useCreateIndex', true);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
require('./helper/passport')(passport);

app.use('/user/auth', userAuth);
app.use('/user/question', userQuestion);
app.use('/user/data',userData);

app.use('/admin/auth',adminAuth);
app.use('/admin/domain',adminDomain);
app.use('/admin/algorithm',adminAlgorithm);
app.use('/admin/question',adminQuestion);
app.use('/admin/modelinfo',adminModelInfo);

module.exports.app = app;

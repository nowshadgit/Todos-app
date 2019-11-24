const authenticService = require('../services/authentic.service');
var schema = require('../schema/loginValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');


const jwt = require('jsonwebtoken');

function init(router) {
    router.route('/signup')
        .post(signup); 
    router.route('/login')
        .post(authentic); 
   
    
}

function authentic(req,res) {
  var authenticData=req.body;
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, authenticData, "authentic");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

   authenticService.authentic(authenticData).then((data) => {
   if(data) {
      const input = {uid: data[0].id, email: data[0].email};
      const token = jwt.sign(input,'my_secret_key',{ expiresIn: 60*60*24 });
      const customData = {
        name: data[0].name,
        token: token
      }
      res.json({
        "success":true,
        "data":customData,
      });
    }
  }).catch((err) => {
    res.json(err);
  });

}



function signup(req, res) {
  var signUpData=req.body;
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, signUpData, "signUpData");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

   authenticService.signup(signUpData).then((data) => {
    if(data) {
       res.json({
         "success":true,
         "data":data
       });
     }
   }).catch((err) => {
     res.json(err);
   });

}



module.exports.init = init;




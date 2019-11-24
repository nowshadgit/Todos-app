const todoService = require('../services/todo.service');
var schema = require('../schema/todoValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
const jwt = require('jsonwebtoken');


function init(router) {
    router.route('/todo')
        .get(getAllTodos)
        .post(addTodo);
    router.route('/todo/:id')
        .get(getTodoById)
        .delete(deleteTodo)
        .put(updateTodo); 
    router.route('/logout')
        .get(logout); 
}

function getAllTodos(req,res) {
  var token = req.headers['token'];
  var decoded = jwt.verify(token, 'my_secret_key');
  todoService.getAllTodos(decoded.uid, req.query.limit, req.query.offset).then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function getTodoById(req,res) {

  let todoId = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,todoId,"todos");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  todoService.getTodoById(todoId).then((data) => {
    res.status(200).send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addTodo(req,res) {
  var todoData=req.body;
  var token = req.headers['token'];
  var decoded = jwt.verify(token, 'my_secret_key');
  todoData.uid = decoded.uid;
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, todoData, "todos");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  todoService.addTodo(todoData).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function updateTodo(req,res) {
   var todoData=req.body;
   var id = req.params.id;
   todoService.updateTodo(id,todoData).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
      res.json(err);
   });
}


function deleteTodo(req,res) {
  var delId = req.params.id;
  todoService.deleteTodo(delId).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
      res.json(err);
  });
}

function logout(req,res) {
  var token = req.headers['token'];
  if(token){
    //  jwt.sign({},'my_secret_key',{ expiresIn: 1 });
      let temp = jwt.sign({}, 'my_secret_key',{ expiresIn: 1 });
     res.json({
       "success":true,
       "token": temp
     });
  }
    
}

module.exports.init = init;




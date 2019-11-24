var todoModel = require("../models/todo-model.js");


var todoService = {
    getAllTodos: getAllTodos,
    getTodoById:getTodoById,
    addTodo: addTodo,
    updateTodo:updateTodo,
    deleteTodo:deleteTodo
}

function addTodo(todoData) {
    return new Promise((resolve,reject) => {
        todoModel.addTodo(todoData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}


function updateTodo(id,todoData,callback) {
    return new Promise((resolve,reject) => {
        todoModel.updateTodo(id,todoData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
     
}

function deleteTodo(id) {
    return new Promise((resolve,reject) => {
        todoModel.deleteTodo(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getAllTodos(uid, limit, offset) {
    return new Promise((resolve,reject) => {
        todoModel.getAllTodos(uid, limit, offset).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getTodoById(id) {
    return new Promise((resolve,reject) => {
        todoModel.getTodoById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = todoService;


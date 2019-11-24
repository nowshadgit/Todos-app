var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var todoModel = {
   getAllTodos:getAllTodos,
   addTodo:addTodo,
   updateTodo:updateTodo,
   deleteTodo:deleteTodo,
   getTodoById:getTodoById
}

function getAllTodos(uid, limit, offset) {
    return new Promise((resolve,reject) => {
        let data = {};
        db.query("SELECT COUNT(uid) as totalCount FROM todos WHERE uid = "+uid,(error,result)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                data.count = result[0].totalCount;
                db.query('SELECT * FROM todos WHERE uid = '+uid+' LIMIT '+limit+' OFFSET '+offset+' ',(err,result)=>{
                    if(!!err) {
                        dbFunc.connectionRelease;
                        reject(err);
                    } else {
                        data.result = result;
                        dbFunc.connectionRelease;
                        resolve(data);
                    }
                });
                
            }
       });
    });
}

function getTodoById(id) {
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM todos WHERE id ="+id.id,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });
    });  
}

function addTodo(todo) {
     return new Promise((resolve,reject) => {
         db.query("INSERT INTO todos(title, description, uid)VALUES('"+todo.title+"','"+todo.description+"','"+todo.uid+"')",(error,rows,fields)=>{
            if(error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
          });
        });
}


function updateTodo(id,todo) {
    return new Promise((resolve,reject) => {
        db.query("UPDATE todos set title='"+todo.title+"',description='"+todo.description+"' WHERE id='"+id+"'",(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });    
    })
}

function deleteTodo(id) {
   return new Promise((resolve,reject) => {
        db.query("DELETE FROM todos WHERE id='"+id+"'",(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });    
    });
}


module.exports = todoModel;


var bodyparser = require('body-parser');
var mongoose = require('mongoose');

//connect to database

mongoose.connect('mongodb+srv://test:test%40123@todo.sh7ggcp.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true});

//creating schema
var todoscheme = new mongoose.Schema({
    item:String
});

var Todo = mongoose.model('to-do',todoscheme);

// async function saveTodo() {
//     try {
//       const itemOne = new Todo({item: 'get flowers'});
//       await itemOne.save();
      
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   console.log('item saved');
//   saveTodo();
// var data = [{item:'get milk'},{item:'study dsa'},{item:'learn Mern'}];
//middle ware running in this post request
var urlencode = bodyparser.urlencoded({extended:false});
module.exports = function(app){
    app.get('/todo',function(req,res){

        //get data from the mongodb database and pass it to the view
        // Todo.find({},function(err,data){
        //     if (err) throw err;
        //     res.render('todo',{todos:data});
        // });
        Todo.find({}).then(function(data){
    
            res.render("todo",{todos:data});
        
          })
           .catch(function(err){
            console.log(err);
          })
        
    }); 
    app.post('/todo',urlencode,function(req,res){
        //save the added item to the mongodb database
        // data.push(req.body);
        // res.json(data);

       const itemadd = new Todo(req.body);
       itemadd.save().then(function(data){
        res.json(data);
       })
       .catch(function(err){
        console.log(err);
       })
    }); 
    app.delete('/todo/:item',function(req,res){
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g,'-') !== req.params.item;

        // });
        // Todo.find({item:req.params.item.replace(/\-/g," ")}).deleteMany(function(err,data){
        //     if(err) throw err;
        //     res.json(data);
        // });
        const deleteddata = Todo.find({item:req.params.item.replace(/\-/g," ")});
        Todo.deleteMany(deleteddata).then(function(data){
            res.json(data);
        })
            .catch(function(err){
            console.log(err);
        })

        
       
    }); 
};
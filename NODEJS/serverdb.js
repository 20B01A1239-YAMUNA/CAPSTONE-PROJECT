const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "gym_db"
});
const upload = multer({storage:multer.memoryStorage()});

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("successfully connected")
    }
});

app.get("/report",(req,res)=>{    
    db.query("select * from usersdata",
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result)
            res.send(result)

        }
    })

})
  
app.post("/signup",(req,res)=>{

    const name = req.body.name
    const password = req.body.password
    const mail = req.body.email
    const pno = req.body.phone

    
    db.query("insert into usersdata(name,email,password,phno) values (?,?,?,?)",
    [name,mail,password,pno],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result)
            res.send(result)

        }
    })

})

app.post("/update",(req, res)=>{
    const {name, email} = req.body.updateval
    console.log(email);
    console.log(name);
    const updatesql = `Update usersdata set email = ? where name = ?`;
    db.query(updatesql,[ email,name],function(err, data, fields){
        if(err){
            console.log(err);
        }      
        else{
            console.log("updated successfully")
        }
    })
})
app.post("/signin",(req,res)=>{
    const name = req.body.name
    const password = req.body.password
    db.query("select * from usersdata where name = ? and password = ?",
    [name,password],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }
        if(result.length>0){
            res.send(result)
        }
        else
          res.send({message:"wrong username/password"})
    })
})

app.post("/delete",(req,res)=>{

    const name = req.body.name
    
    db.query("delete from usersdata where name = ?",
    [name],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("successfully deleted");
            res.send(result)

        }
    })

})



app.listen('8080',()=>{
    console.log("server listening")
})




































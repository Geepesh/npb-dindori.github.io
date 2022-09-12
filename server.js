//const path = require('path');
//const fs = require('fs');
const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
//const multer = require('multer')
const mongoose = require('mongoose')
const port = 8010 || process.env.PORT
const bp = require('body-parser')
//const Data = require('./models/schema_')
const Msg = require('./models/messages')
//const sharp = require('sharp')
const uri = "mongodb+srv://geepesh_agrawal:geepeshagrawal@cluster0.n8viw.mongodb.net/message-database?retryWrites=true&w=majority"

app.use(bp.urlencoded({
  extended : false
}))
app.set('view engine','ejs')
app.set('views','templates')
app.use(express.static('staticFiles'))
//app.use('/uploads',express.static('uploads'))
mongoose.connect(uri,{
  useNewUrlParser : true
}).then(()=>{
    console.log('DATABASE CONNECTED!!!!!!!!');
})

app.get('/',(req,res)=>{
  res.render('main')
})
app.get('/products',(req,res)=>{
  res.render('main')
})
app.get('/about',(req,res)=>{
  res.render('about')
})

app.get('/map',(req,res)=>{
  res.render('map')
})
app.get('/problemResolver',(req,res)=>{
  Msg.find({},(err,data)=>{
  res.render('problemResolver',{
    data : data
    })
  })
  .exec((err, data)=>{
      if(err){console.log(err)}
      else{
        res.json(data)
      }
  })
})
app.post('/problemResolver', (req, res) => {
  Msg.find({},(err,data)=>{
  res.render('problemResolver',{
    data : data
    })
  })
  .exec((err, data)=>{
      if(err){console.log(err)}
      else{
        res.json(data)
      }
  })
});

io.on('connection', (socket) => {
  //console.log('a user connected');
  Msg.find().then((result)=>{
    socket.emit('outPutMsg',result)
  })
  socket.on('chat message', (user,msg) =>{
    const message = new Msg({user,msg})
     message.save().then(()=>{
     io.emit('chat message', user,msg);
    })
  })
});

app.get('*',(req,res)=>{
  res.send('404')
})


http.listen(port,()=>{
  console.log(`server is running on localhost:${port}`);
})



/*
app.post('/dashboard', upload.single('file'),async (req, res) => {
       //const { filename: image } = req.file;
  const { filename: file } = req.file;
  let name , email , password , reentered_password ,img_name;
  img_name = req.file.filename;
  console.log(req.body);
  console.log(req.file);
       await sharp(req.file.path)
        .resize(350, 350)
        .jpeg({ quality: 90 })
        .toFile(
            path.resolve(req.file.destination,'resized', img_name)
        )
        fs.unlinkSync(req.file.path)
        console.log(req.file.destination);
        res.send(`<img src="/uploads/resized/${img_name}">`);
    name = req.body.name;
    email = req.body.email;
    password = req.body.password;
    reentered_password = req.body.reentered_password;
    Data.findOne({email : email},(err,dta)=>{
      if(dta){
        res.send(`${email} is already associated with us`)
      }else{
        let newData = new Data({
            name  : name ,
            email : email ,
            password : password,
            img_name : img_name,
          });
          newData.save().then(()=>{
            res.render('dashboard',{
              name : name,
              email : email,
              password : password,
              photo : img_name
            })
            console.log("user's data saved");
          })

      }
    })
});

app.get('/login',(req,res)=>{
  res.render('login')
})

app.post('/login',(req,res)=>{
  let email = req.body.email
  let password = req.body.password
  Data.findOne({email:email,password:password},(err,item)=>{
    if(err){
      console.log('errrrrrrrrrrrrrrr');
    }else{
      console.log(item.img_name);
      Msg.find({},(err,data)=>{
      res.render('chat',{
        email : item.email,
        name : item.name,
        img : item.img_name,
        data : data
      })
    })
    .exec((err, data)=>{
        if(err){console.log(err)}
        else{
          res.json(data)
        }
    })
    }
  })
})
*/
/*
app.post('/login',(req,res)=>{
  let email = req.body.email
  let password = req.body.password
  Data.findOne({email:email,password:password},(err,item)=>{
    if(err){
      console.log("errrrrrrr");
    }else{
      res.send(item)
    }
  })
  })
  console.log(Data.findOne({email:email,password:password}));
})
*/
/*
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage })
*/

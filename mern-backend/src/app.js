const exp = require("constants");
const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const Register = require("./models/login");
const port  = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.set("view engine", "hbs");
// app.set('views',path.join(__dirname,'views'));
// app.set('views engine','hbs');
console.log(path.join());
app.get("/", (req, res) => {
        res.render("index")
});

app.get("/login_page.hbs", (req , res) =>{
        res.render("login_page");
})
app.get("/logiin.hbs", (req , res) =>{
        res.render("logiin");
})

app.post("/login_page", async (req , res) =>{
        try {
               const password = req.body.password;
               const cpassword = req.body.confirmpassword;

               if(password === cpassword){
                const registerEmploye = new Register({
                        username : req.body.username,
                        email : req.body.email,
                        password : req.body.password,
                        confirmpassword : req.body.confirmpassword
                })
                const registered = await registerEmploye.save();
                res.status(201).render("index");
               }else{
                res.send("password are not matching !")
               }
        } catch (error) {
                res.status(400).send(error)
        }
})
// login check
app.post("/logiin", async(req, res) => {
        const {
                email,
                password
        } = req.body;

        Register.findOne({email:email},(err, result)=>{
                if(email === result.email && password === result.password){
                        res.render('index');
                    }else{
                        console.log('fail');
                    }
        })
})
app.listen(port, () => {
     console.log(`server is running at port no ${port}`);
})
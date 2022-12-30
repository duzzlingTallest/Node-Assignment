const express = require('express')
const hbs = require('hbs')
const path = require('path')
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/KaushalDb')    
const products = require('./models/products');

         

const app = express() 
const PORT = 8000

app.set('view engine','hbs')  //  set the view engine which help to show the out put on the browser.
app.set('views', path.join(__dirname, 'Template/Views')) // this set path and track..

const usePartialPath = path.join(__dirname, 'Template/Partial')
hbs.registerPartials(usePartialPath)

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    
    // const currentUser = req;
    const products1 = await products.find()
    
     res.render('Home',{Products:products1})   
 
})
app.get('/products', async function (req, res) {
    const currentUser = req;
    const products = await products.find()

    res.render('Products', { Products: products,currentUser })
})
app.get('/addproduct', async function (req, res) {

    const currentUser = req;
    res.render('AddProudct',{currentUser })
})

app.get("/addproduct", async (req, res) => {
    
    res.render('AddProduct')
})



app.post("/addproduct", async (req,res)=>{
    console.log(req.body)
    const products3 = await new products(req.body)
        products3.save()
        res.redirect('/products')
})

app.get('/editproduct', async function (req,res) {
    const _id = req.query.eid
    const product = await products.findById({_id:_id})
    res.render('addproduct', { product: product })
})

app.post('/editproduct', async function (req, res) {
    
     const _id = req.query.eid

    const product1 = await products.findByIdAndUpdate(_id, req.body)
    
   res.redirect('/products')
})


const { findByIdAndDelete } = require('./models/products');

app.get('/deleteproduct/:id', async function (req,res) {
    const id = req.path.split('/')
    const _id = id[2]
    const product =  await products.findByIdAndDelete({_id:_id})
    res.redirect('/products')
})

app.get('/login', function (req,res) {
    res.render('login')
})

app.post('/login', function (req,res) {
    const { name, email, password } = req.body
    User.findOne({ email }, 'name email password').then((user) => {

        if (!user) {
            res.send('No user Found...')
        }
        bycrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) {
                console.log('Password Not Match,....')
            }
            const token = jwt.sign({ _id: user._id, name: user.name }, 'secretekey', {
                expiresIn: '60 days',
            });

            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect('/')

        })
    }).catch((err) => {

    })

})
app.get('/signup', function (req, res) {
    res.render('Signup')
})
app.post('/signup', async function (req, res) {
    const user = await new user(req.body)
    user.save().then((user) => {
        const token = jwt.sign({ _id: user._id }, 'secretekey', { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/login');
    }).catch((err) => {

    })
    //res.redirect('/')
})

app.get('/logout', function (req, res) {
    res.clearCookie('nToken');
    return res.redirect('/login');
})







app.listen(PORT, ()=>{
    console.log("Server is Running on",PORT);
})
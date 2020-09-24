const express = require("express")
const app = express()
const hbs = require("hbs")
hbs.handlebars === require("handlebars")
const mongoose = require("mongoose")
const ShopItem = require("./models/shopItem")
require("dotenv").config()
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
hbs.localsAsTemplateData(app)
const port = process.env.PORT || 3000
app.locals.shopData = []
app.locals.randomItems = []
app.locals.singleItem = {}

app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("I am connect")
        app.listen(port, () => {
            console.log("listen here you little...")
        })
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    ShopItem.find()
        .then((result) => {
            app.locals.shopData = result
            res.status(200).render("index")
        })
        .catch(err=>console.log(err))
})

app.get("/single/:id", (req, res) => {
    ShopItem.findById(req.params.id)
        .then((result) => {
            app.locals.singleItem = result
            res.status(200).render("single")
        })
    .catch(err=>console.log(err))
})

app.post("/edit/:id", (req, res) => {
    let updatedShopItem = req.body
    ShopItem.findByIdAndUpdate(req.params.id, updatedShopItem, {useFindAndModify: false})
        .then((result) => {
            console.log("I am written")
            res.status(201).redirect(`/single/${req.params.id}`)
        })
    .catch(err=>console.log(err))
})

app.get("/new", (req, res) => {
    ShopItem.find()
        .then((result) => {
            let rndArr = []
            while (rndArr.length < 6) {
                let rndNr = Math.floor(Math.random() * result.length)
                if (!rndArr.includes(rndNr)) {
                    rndArr.push(rndNr)
                }
            }
            app.locals.randomItems = []
            for (let i = 0; i < rndArr.length; i++) {
                app.locals.randomItems.push(result[rndArr[i]])
            }
            res.status(200).render("new")
        })
    .catch(err=>console.log(err))
})

app.post("/add", (req, res) => {
    let newShopItem = new ShopItem({
        product_name: req.body.product_name,
        product_picture_link: req.body.product_picture_link,
        company: req.body.company,
        price: req.body.price,
        link_shop: req.body.link_shop,
        description: req.body.description
    })
    newShopItem.save()
        .then((result) => {
            console.log("I am write")
            res.status(201).redirect("/")
        })
        .catch(err => console.log(err))
})

app.get("/delete/:id", (req, res) => {
    ShopItem.findByIdAndDelete(req.params.id)
        .then((result) => {
            console.log("I am delete")
            res.status(201).redirect('/')
    })
})

app.get("/lowPrice", (req, res) => {
    ShopItem.find({ $expr: { $lt: [{ $toDouble: "$price" }, 30] } })
        .then((result) => {
            app.locals.shopData = result
            res.status(200).render("index")
        })
    .catch(err=>console.log(err))
})

app.get("/weekly", (req, res) => {
    ShopItem.find()
        .then((result) => {
            let rndArr = []
            while (rndArr.length < 6) {
                let rndNr = Math.floor(Math.random() * result.length)
                if (!rndArr.includes(rndNr)) {
                    rndArr.push(rndNr)
                }
            }
            app.locals.randomItems = []
            for (let i = 0; i < rndArr.length; i++) {
                app.locals.randomItems.push(result[rndArr[i]])
            }
            res.status(200).render("weekly")
        })
    .catch(err=>console.log(err))
})
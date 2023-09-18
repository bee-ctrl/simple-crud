const express = require("express")
const methodOverride = require("method-override")
const app = express()
const port = 3000
const {body, validationResult} = require("express-validator")
const modelItem = require("./models/item")

// CONNECT TO DATABASE
require("./utils/database")

// SET VIEW ENGINE
app.set("view engine", "ejs")

// MIDDLEWARE
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// ROUTER
app.get("/", async(request, response)=>{
    const items = await modelItem.find()
    response.render("item/index_item", {
        title: "BEE-CTRL | Dashboard",
        items
    })
})

app.get("/item/add", (request, response)=>{
    response.render("item/add_item", {
        title: "BEE-CTRL | Add Item"
    })
})

app.post("/item", (request, response)=>{
    modelItem.insertMany(request.body)
    return response.redirect("/")
})

app.get("/item/edit/:name", async (request, response) =>{
    const items = await modelItem.findOne({name: request.params.name})
    response.render("item/edit_item", {
        title: "BEE-CTRL | Edit Item",
        items
    })
})

app.put("/item",
    (request, response)=>{
        modelItem.findByIdAndUpdate({_id: request.body._id},{
            $set:{
                name: request.body.name.trim(),
                category: request.body.category.trim(),
                stock: request.body.stock.trim(),
                price: request.body.price.trim()
            }
        }).then((result)=>{
        response.redirect("/")
    })
})

app.get("/item/delete/:_id", async (request, response)=>{
    const items = await modelItem.findById({_id: request.params._id})
    if(!items){
        response.status(404)
        response.send("404")
    }else{
        modelItem.deleteOne({_id: items._id}).then((result)=>{
            response.redirect("/")
        })
    }
})

app.delete("/item", (request, response)=>{
    modelItem.deleteOne({_id: request.body._id}).then((result)=>{
        response.redirect("/")
    })
})

app.listen(port, ()=>{
    console.log(`
    CONNECT WITH PORT : ${port}
    URL : http://localhost:${port}`)
})

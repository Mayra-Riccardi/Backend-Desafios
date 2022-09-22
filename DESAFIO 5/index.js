const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const Products = require("./model/data");


const app = express();
const products = new Products();
const { list } = products;

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Configuramos el motor de plantilla de handlebars
/* app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayaout: 'main.hbs',
  layoutDir: path.resolve(__dirname, './views/layouts'),
  partialsDir: path.resolve(__dirname, "./views/partials")
})) */ 


//metodo set
app.set("views", "./views");

//handlebars
//app.set("view engine", "hbs");

//pug
//app.set("view engine", "pug");

//ejs
//app.set('view engine', 'ejs');

app.post("/productos", (req, res) => {
  const data = req.body;
  const { title, price, thumbnail } = req.body;
  if (title || price || thumbnail) {
    products.save(data);
    res.redirect("/productos");
  }
});

app.get("/productos", (req, res) => {
  if (list.length >= 1) {
    res.render("index", {
      mostrarProductos: true,
      products: list,
    });
  } else {
    res.render("index", {
      mostrarProductos: false,
    });
  }
});



const connectedServer = app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on port ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(`error:`, error.message);
});
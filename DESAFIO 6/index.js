const express = require ('express');// como siempre importar libreria de express
const { Server: HttpServer } = require ('http');//los dos puntos son para cambiarle el nombre al servidor
const { Server: SocketServer } = require ('socket.io');//importamos libreria de websocket
const { formatMessage } = require ('./utils/utils')
const Products = require("./model/data");
const { engine } = require("express-handlebars");
const path = require("path");

const PORT = process.env.PORT || 8080;// definimos puerto
const app = express();//definimos constante para nuestro servidor
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);//estos dos ultimos pasos se hacen para imprementar express y socket al tiempo.
const products = new Products();//mi clase de productos
const { list } = products;
const { data } = products;



//Middlewares
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuramos el motor de plantilla de handlebars
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayaout: 'main.hbs',
  layoutDir: path.resolve(__dirname, './views/layouts'),
  partialsDir: path.resolve(__dirname, "./views/partials")
}))

//metodo set para hbs
app.set("views", "./views");
app.set("view engine", "hbs");

//Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
    const data = req.body;
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) {
      return;
    }
    products.save(data);
    res.redirect("/");
  });

//Variable
const messages = [];
const users = [];

//Socket
io.on("connection", (socket) => {
    console.log(`Nuevo usuario conectado!`);
    console.log(`Usuario ID: ${socket.id}`)

//socket.emit('server-message', "Mensaje desde el servidor")


 io.emit("products", [...list]);

 io.emit("message", [...messages]);

 socket.on("new-user", (email) => {
  const newUser = {
    id: socket.id,
    email: email,
  };
  users.push(newUser);
 });

 socket.on("new-message", async (msj) => {
  const user = users.find((user) => user.id === socket.id);
  const newMessage = formatMessage(socket.id, user.email, msj);
  messages.push(newMessage);
  products.saveMessage(user.email, msj, newMessage.time);

  io.emit("chat-message", newMessage);
 })
 
})


//Conexión del Servidor
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`🚀Server active and runing on port: ${PORT}`);
  });
  
  connectedServer.on("error", (error) => {
    console.log(`error:`, error.message);
  });
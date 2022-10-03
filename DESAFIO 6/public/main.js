//console.log("FUNCIONA!!!")

const socket = io()

//FORMULARIO
//Seleccionamos el div donde se renderizaran los productos a medida que los cargamos, este viene de products.hbs
const div = document.getElementById("table-products");

//Metodo on() para renderizar los productos cargados.
socket.on("products", (data) => {
  console.log(data);
  const table = `
  <tr style="font-size: 25px;">
    <th style="width: 450px;">Nombre</th>
    <th style="width: 450px;">Precio</th>
    <th style="width: 450px;">Imagen</th>
  </tr>`;
  const html = data.map((product) => {
      const tableProducts = ` 
      <tr style="display: flex; justify-content: space-around; margin-top: 30px;">
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td><img style="width: 50px;" src=${product.thumbnail} alt=${product.id}/></td>
      </tr>
        `;
      return tableProducts;
    })
    .join("");
  div.innerHTML = `${table} ${html}`;
});

//CHAT
const formChat = document.getElementById("form-chat");
const inputEmail = document.getElementById("username");
const inputText = document.getElementById("text");

formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = inputEmail.value;
  const message = inputText.value;
  socket.emit("new-user", user);
  socket.emit("new-message", message);
  inputEmail.value = user;
  inputText.value = "";
});

socket.on("chat-message", (data) => {
  const user = data.email;
  const message = data.text;
  document.getElementById("chat").innerHTML += `<p style="padding-top: 0.3rem"><b><span style="color: red">${user} - </b></span> 
  <span style="color: gray">[${data.time}]:</span> 
  <span style="color:green"><i>${message}</i></span></p>`;
});

socket.on("message", (data) => {
  const html = data.map((user) => {
    let render = `
    <p style="padding-top: 0.5rem"><b><span style="color: blue">${user.email}</b></span> 
    <span style="color: gray">[${user.time}]:</span> 
    <span style="color: green"><i>${user.text}</i></span></p>
    `;
    return render;
    })
    .join("\n");
  document.getElementById("chat").innerHTML = html;
});
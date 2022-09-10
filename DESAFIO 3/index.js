const PORT = process.env.PORT || 8080;

const fs = require('fs');
const express = require('express');
const app = express();

class Contenedor {
    constructor(name) {
  
      this.name=name
     
    }
  async save(data){
      try{
          const file = await fs.promises.readFile(`./${this.name}`,"UTF-8")
          const array = JSON.parse(file)
          const lastProduct = array.length -1
          const lastId = array[lastProduct].id
          data.id = lastId + 1
          const newId = data.id
          array.push(data)
          await fs.promises.writeFile(`./${this.name}`, JSON.stringify(array)) 
          return newId;
      }
      catch(err){
        console.log("Upss " + err)
      }
  }
  
  async getById(id){
      try{
        const file = await fs.promises.readFile(`./${this.name}`,"UTF-8")
        const array = JSON.parse(file)
        const found = array.find(element => element.id == id)
        if(found){
          return found;
        } else {
          console.log("Producto no encontrado ❌")
          return null
        }
      }
      catch(err){
        console.log("Upss " + err)
      }
  }
  
  async getAll(){
      try {
        const file = await fs.promises.readFile(`./${this.name}`,"UTF-8")
        const array = JSON.parse(file)
        return array
    }
      catch(err) {
        console.log("Upss " + err)
    }
  
  }
  async getProductRandom() {
    try {
        const file = await this.getAll();
        const productRandom = file[Math.floor(Math.random() * file.length)]
        return productRandom
    }
    catch (err) {
        return err
    }
}
  
  async deleteById(id){
    try{
      const file = await fs.promises.readFile(`./${this.name}`,"UTF-8")
      const array = JSON.parse(file)
      const found = array.find(element => element.id == id)
      if(found == undefined){
        return console.log(`Producto no encontrado ❌`)
      } else {
        const deleteProduct = array.indexOf(found)
        array.splice(deleteProduct, 1)
        await fs.promises.writeFile(`./${this.name}`, JSON.stringify(array))
        return console.log(`Producto borrado ✅`)
      }
    }
    catch(err){
      console.log("Upss " + err)
    }
  
  }
  
  async deleteAll(){
    try {
      await fs.promises.writeFile(`./${this.name}`, JSON.stringify([]))
      return console.log(`Productos borrados, el array está vacio`)
    }
    catch(err) {
      console.log("Upss " + err)
    }
  }
  
  }
  
  //creacion de la clase
  let contenedor = new Contenedor("products.json")
  


app.get('/products', async (req,res) => {
    contenedor.getAll().then((products) => res.send(products)) 
})

app.get('/productRandom', async (req,res) => {
    contenedor.getProductRandom().then((product) => res.send(product))
})

app.get('*', async (req,res) => {
    res.send('Ir a <a href="./products">Productos</a> \n Ir a <a href="./productRandom">Producto Random</a>')
})




// Escuchar puerto seteado
const connectedServer = app.listen(PORT, () => {console.log(`Server is UP and RUNNING on http://localhost:${PORT}`)})

// Caputra el error y lo muestra
connectedServer.on('error', (error) => {console.log(error)}) 



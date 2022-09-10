const fs = require("fs");

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

//productos.json producto a agregar

let product = {
    "id": 1,
    "title":"Silla Gamer",
    "thumbnail":"https://desillas.com/img/productos/TCQENU_3.jpg"
}



//prueba de los metodos

//SAVE
/*
contenedor.save(product)
.then (resolve => {
    console.log(resolve)
})
*/

//GETBYID
/*
contenedor.getById(2)
.then (resolve => {
    console.log(`El producto encontrado es:\n${resolve.title}\nID: ${resolve.id}`)
})
.catch (error => {
    console.log(error)
} )
*/

//GETALL
/*
contenedor.getAll()
.then (resolve => {
    console.log(resolve)
})
.catch (error => {
    console.log(error)
} )
*/

//DELETEBYID
/*
contenedor.deleteById(3)
.then (resolve => {
    console.log(resolve)
})
.catch (error => {
    console.log(error)
})
*/

//DELETEALL
/*
contenedor.deleteAll()
.then (resolve => {
  console.log(resolve)
})
.catch (error => {
  console.log(error)
})
*/

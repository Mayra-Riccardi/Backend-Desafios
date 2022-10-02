const products = []
const msj = [];
   class Products {
    constructor() {
    this.list = products;
    this.data = msj;
    }
  
    getAll() {
      return this.list;
    }
  
    getById(productId) {
      return this.list.find(product => product.id === +productId);
    }
    save(product) {
      const { title, price, thumbnail } = product;
      if (!title || !price || !thumbnail) {
        return null;
      }
 
      const newProduct = {
        id: this.list.length + 1,
        title,
        price,
        thumbnail,
      };
  this.list.push(newProduct)
  return newProduct
  } 

    saveMessage(email, text, time) {
      const user = {
        email,
        text,
        time,
      };
      this.data.push(user);
      return this.data;
    }
  }
  
  
 module.exports = Products;
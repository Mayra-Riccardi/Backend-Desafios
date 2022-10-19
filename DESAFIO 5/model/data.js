const products = [
  {
    id: 1,
    title: "Mouse",
    price: 330,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_607979-MLA32146296906_092019-O.webp"
  },
  {
    id: 2,
    title: "Teclado",
    price: 150,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_926252-MLA45169314132_032021-O.webp"
  },
  {
    id: 3,
    title: "Monitor",
    price: 500,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_837353-MLA45884040838_052021-O.webp"
  }
] 

class Products {
  static lastProductId = products[products.length - 1].id;
  constructor() {
    this.list = products;
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
    Products.lastProductId++;
    const newProduct = {
      id: Products.lastProductId,
      title,
      price,
      thumbnail,
    };
this.list.push(newProduct)
return newProduct
}
  updateById(productId,product){
    const productIndex = this.list.findIndex((product)=>product.id ===+productId)
    if(productIndex <0) return null;
    const{
        title,
        price,
        thumbnail
    }= product;
  const updateProduct ={
    id:this.list[productIndex].id,
    title,
    price,
    thumbnail
  }
  this.list[productIndex] = updateProduct
  return updateProduct;
  }

  deleteById(productId){
    const productIndex = this.list.findIndex((product) =>product.id === +productId)
    if (productoIndex <0) return null
    return this.list.splice(productIndex,1)
  }
  
}


 module.exports = Products;

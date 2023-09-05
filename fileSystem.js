import {promises as fs} from "fs"

class ProductManager {
    constructor() {
        this.patch = "./products.txt"
        this.products = []
    }

    static id = 0 

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title, description, price, thumbnail, code, stock, id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let showProducts = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(showProducts)
    }

    getProducts = async () => {
        let showProducts2 = await this.readProducts()
       return console.log(showProducts2)
    }

    getProductsById = async (id) => {
        let findId = await this.readProducts()
        if(!findId.find(product => product.id === id)) {
            console.log("Producto no encontrado")
        } else {
            console.log(findId.find(product => product.id === id))

        }

    }

    deleteProductsById = async (id) => {
        let findId = await this.readProducts();
        let filter = findId.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(filter));
        console.log("Producto eliminado")
    };

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let oldProd = await this.readProducts()
        let newProd = [{...producto,  id},...oldProd];
        await fs.writeFile(this.patch, JSON.stringify(newProd));

    }
}

const productos = new ProductManager

// Agregar productos
//productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
//productos.addProduct("producto prueba2", "Este es un producto prueba2", 300, "Sin imagen2", "abc1234", 30)

// productos.getProducts()

//Obtener producto por Id
// productos.getProductsById(1)

//Elimnar producto por Id
// productos.deleteProductsById(2)

//Sustituir producto con un mismo Id
productos.updateProducts({
    title: 'producto prueba nuevo',
    description: 'Este es un producto prueba nuevo',
    price: 2000,
    thumbnail: 'Sin imagen nuevo',
    code: 'abc123',
    stock: 30,
    id: 2
})
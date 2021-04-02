import React, { Component } from "react";
import Axios from "axios";

const ProductContext = React.createContext();

const URL = "https://ecomrestapi.herokuapp.com";

class ProductProvider extends Component {
  state = {
    products: [],
    cart: [],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    DCharges: 0
  };

  componentDidMount() {
    Axios.get(`${URL}/product/api/getProducts`)
      .then((res) => {
        console.log("data = ", res.data);
        this.setState({
          products: res.data,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    this.setProducts();
  }
  //set Products into front-end
  setProducts = () => {
    let tempProducts = [];
    this.state.products.forEach((item) => {
      const singleItem = { ...item };
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  //read single item
  getItem = (id) => {
      return this.state.products.find((item) => item._id === id);
  }

  //add to cart logic
  addToCart = (id) => {
    console.log("product Id =", id);
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];

    product.inCart = true;
    product.count = 1;
    product.total = Number(product.price);
    this.setState(
        () => {
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            }
        },
        () => {
            this.addTotal()
        }
    );
  }

  //calculate total values
  addTotal = () => {
    let subTotal = 0;
    let dch = 0.5;
    this.state.cart.map((item)=> (subTotal += item.total));
    const tempTax = subTotal * 0.25;  //2.5%
    const tax = parseFloat(tempTax.toFixed(2));
    const dc = parseFloat(subTotal * (dch / 100).toFixed(2));
    const total = subTotal + tax + dc;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        dCharges: dc,
        cartTotal: total
      }
    });
  };

  //increment product count
  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selProduct = tempCart.find((item) => item._id ===id);

    const index = tempCart.indexOf(selProduct);
    const product = tempCart[index];

    product.count += 1;
    product.total = product.count * product.price;
    this.setState(
      () => {
        return { cart: [...tempCart] }
      },
      () => {this.addTotal()}
    );
  }

  //decrement product count
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selProduct = tempCart.find((item) => item._id ===id);

    const index = tempCart.indexOf(selProduct);
    const product = tempCart[index];

    product.count -= 1;
    if (product.count  === 0) {
      //remove product from cart
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {cart: [...tempCart]}
        },
        () => {this.addTotal()}
      );  
    }
  }

  //to remove product
  removeItem = (id) => {
    let tempProducts =[...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter((item)=> item._id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let remProduct = tempProducts[index];
    remProduct.inCart = false;
    remProduct.count = 0;
    remProduct.total = 0;
    remProduct.dCharges = 0;
  
    this.setState(
      () => {
        return {cart: [...tempCart], product: [...tempProducts] }
      },
      () => {this.addTotal()}
    );
  };


  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          increment: this.increment,
          decrement: this.decrement,
          removeItem : this.removeItem
          
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

//create consumer
const ProductConsumer = ProductContext.Consumer;

//exporting provider, consumer
export { ProductProvider, ProductConsumer };

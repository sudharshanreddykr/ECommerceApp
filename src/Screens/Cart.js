import React, { Component } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import Navbar from "./component/Navbar";
import { ProductConsumer } from "../Context";

export default class Cart extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="jumbotron text-center">
                <h1 className="display-1 text-info">Cart</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="jumbotron">
                <CardTop>
                  <h3 className="text-left">My Bag</h3>
                  <p className="text-right">Items are reserved for few mins.</p>
                </CardTop>
                <CardBody>
                  <ProductConsumer>
                    {(value) =>
                      value.cart.map((item, key) => {
                        return (
                          <CartItem key={key}>
                            <img src={item.image} alt={item.title} />
                            <div className="row">
                              <div className="col-md-12">
                                <ul className="list-group">
                                  <li className="list-group-item">
                                    <strong className="text-info text-uppercase">
                                      {item.title}
                                    </strong>
                                    <strong className="float-right text-success">
                                      &#8377; {item.price}
                                    </strong>
                                    <hr />
                                    <p className="countBtn">
                                      <span
                                        onClick={() =>
                                          value.decrement(item._id)
                                        }
                                        className="btn btn-sm btn-danger"
                                      >
                                        -
                                      </span>
                                      <span className="text-danger count">
                                        {" "}
                                        {item.count}{" "}
                                      </span>
                                      <span
                                        onClick={() =>
                                          value.increment(item._id)
                                        }
                                        className="btn btn-sm btn-primary"
                                      >
                                        +
                                      </span>
                                      <spam className="btn btn-sm btn-danger float-right" style={{cursor: 'pointer'}} onClick={()=> value.removeItem(item._id)}>
                                        <i className="fas fa-trash"></i>
                                      </spam>
                                    </p>
                                    <p className="subTotal flat-right">
                                      <strong>subTotal: </strong>
                                      <span className="text-warning">
                                        {item.count} * {item.price} =  &#8377;  
                                          {item.total}
                                      </span>
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </CartItem>
                        );
                      })
                    }
                  </ProductConsumer>
                </CardBody>
              </div>
            </div>
            <div className="col-md-4">
              <div className="jumbotron">
                <CardTop>
                  <h3 className="text-left">Total</h3>
                </CardTop>
                <CardBody>
                  <ProductConsumer>
                    {
                      (value) => {
                        const {cartSubTotal,cartTax,cartTotal,dCharges} = value;
                        return (
                          <div className="card">
                            <div className="cart-body">
                              <p>
                                <strong className="text-info">Cart Total</strong>
                                <span className="float-right">
                                  &#8377; {cartSubTotal}
                                </span>
                              </p>
                              
                              <p>
                                <strong className="text-info">Tax</strong>
                                <span className="float-right">
                                  &#8377; {cartTax}
                                </span>
                              </p>
                              <p>
                                <strong className="text-info">Delivery Charges</strong>
                                <span className="float-right">
                                  &#8377; {dCharges}
                                </span>
                              </p>
                              <p>
                                <strong className="text-success">Grand Total</strong>
                                <span className="float-right">&#8377; {cartTotal}</span>
                              </p>
                            </div>
                          </div>
                        );
                      }
                    }
                  </ProductConsumer>
                </CardBody>
                <div className="card">
                  <div className="card-body">
                    <Link to={'/checkout'} className="btn btn-outline-success btn-block text-uppercase">Check Out</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const CardTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px;
  border-bottom: 5px solid #ccc;
  h3 {
    text-transform: uppercase;
    font-family: san-serif;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-all;
  width: 100%;
  margin: 5px;
  img {
    width: 60px;
    height: 80px;
  }
  .row {
    width: 100%;
  }
  .countBtn {
    letter-spacing: 10px;
    span  {
      font-size: larger;
      margin: 3px;
    }
  }
  .count {
    font-weight: bold;
    font-size: larger;
  }
`;

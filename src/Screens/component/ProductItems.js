import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../../Context";

export default class ProductItems extends Component {
  render() {
    const { _id, title, image, price, inCart } = this.props.product;
    return (
      <React.Fragment>
        <div className="col-4">
          <CardWrapper>
            <div className="card">
              <img src={image} alt={title} className="card-img-top" />
              <div className="card-body">
                <h3 className="card-title text-center text-info">{title}</h3>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Price</strong>
                    <span className="float-right badge badge-primary">
                      &#8377; {price}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="card-footer">
                <ProductConsumer>
                  {(value) => {
                    return (
                      <button
                      disabled={!!inCart}
                        onClick={() => value.addToCart(_id)}
                        className={
                          inCart
                            ? "btn btn-outline-danger btn-sm"
                            : "btn btn-outline-success btn-sm"
                        }
                      >
                        {inCart ? "In Cart" : "Add to Cart"}
                      </button>
                    );
                  }}
                </ProductConsumer>
              </div>
            </div>
          </CardWrapper>
        </div>
      </React.Fragment>
    );
  }
}

// styled component

const CardWrapper = styled.div`
  transition: all 1s ease-in-out;
  .card {
    box-shadow: 12px 15px 30px rgba(0, 0, 0, 0.4);
    width: 100%;
    img {
      width: 100px;
      height: 200px;
      margin-left: 120px;
    }
    .card-body {
      h3 {
        font-size: 20px;
        text-transform: uppercase;
      }
    }
  }
`;

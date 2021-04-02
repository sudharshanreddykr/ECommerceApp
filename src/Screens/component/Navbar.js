
import React from 'react'
import {Link} from 'react-router-dom'
import { ProductConsumer } from "../../Context";

export default function Navbar() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-secondary fixed-top">
                <Link to='/' className="navbar-brand">React Shop</Link>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menu">
                    {/* left side menu  */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={"/products"} className="nav-link">Products</Link>
                        </li>
                    </ul>
                    {/* right side menu */}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            
                            <ProductConsumer>
                            {
                                value => {
                                    return (
                                      <Link to={"/cart"} className="nav-link">
                                        cart
                                        <span className="badge badge-warning">
                                          {value.cart.length}
                                        </span>
                                      </Link>
                                    )
                                }
                            }
                            </ProductConsumer>
                            
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }





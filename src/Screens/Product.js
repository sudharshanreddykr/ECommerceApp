import React, { Component } from 'react'
import {ProductConsumer} from '../Context'
import Navbar from './component/Navbar'
import ProductItem from './component/ProductItems'

export default class Product extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron text-center">
                                <h1 className="display-3 text-success" >React Shop</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <ProductConsumer>
                            {
                                (value) => {
                                    console.log('product =', value);
                                    return value.products.map((item, key)=> {
                                        return <ProductItem key = {key} product = {item} />
                                    })
                                }
                            }
                        </ProductConsumer>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

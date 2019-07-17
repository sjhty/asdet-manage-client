import React, { Component } from 'react'
import { HashRouter as Router, Route} from 'react-router-dom'
import App from './App'
import Main from './cms/pages'
import Home from './cms/pages/home'
import ProductCategory from './cms/pages/product/category'
import ProductList from './cms/pages/product/list'


class Routers extends Component {
    render () {
        return (
            <Router>
                <App>
                    <Route path="/manage" render={() => (
                        <Main>
                            <Route path="/manage/home" component={Home}/>
                            <Route path="/manage/products/category/" component={ProductCategory}/>
                            <Route path="/manage/products/list" component={ProductList}/>
                        </Main>
                    )}/>
                </App>
            </Router>
        )
    }
}

export default Routers;
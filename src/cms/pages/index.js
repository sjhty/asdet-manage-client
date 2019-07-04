import React, { Component } from 'react'
import { Row, Col} from 'antd'
import Sider from '../component/slide'
import Header from '../component/header'
import Footer from '../component/footer'
import './index.less'

class Main extends Component {
    render () {
        return (
            <Row>
                <Sider />
                <Col span={20} offset={4} className="main_content">
                    <Header />
                    <Row className="con_box">
                        {this.props.children}
                    </Row> 
                    <Footer></Footer>
                </Col>
            </Row>
        )
    }
}

export default Main;
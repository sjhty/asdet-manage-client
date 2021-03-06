import React, { Component } from 'react'
//import { connect } from 'react-redux'
import { Row, Col, Breadcrumb } from 'antd'
import Utils from '../../../utils'
import LoginImg from '../../assets/images/login_img.jpg'
import '../header/index.less' 

class Header extends Component {
    state = {}
    componentWillMount() {
        setInterval(() => {
            let nowTime = Utils.formateDate(new Date())
            this.setState({
                nowTime
            })
        },1000)
    }

    render () {
        const { menuName } = this.props;
        return (
            <Row className="main_header">
                <Col className="header_con">
                    <Row className="header_up">
                        <Col span={19}></Col>
                        <Col span={5} className="user_info">
                            <span className="welcome_note">欢迎您，<b>微笑</b></span>
                            <span className="user_img"><img src={LoginImg} alt="logo_img"/></span>
                        </Col>
                    </Row>
                    <Row className="heaser_down">
                        <Col span={19} className="breadCrumb">
                            <Breadcrumb separator=">" className="bread_nav">
                                <Breadcrumb.Item>{ menuName || '首页'}</Breadcrumb.Item>
                            </Breadcrumb>
                            <label></label>
                        </Col>
                        <Col span={5} className="show_time">
                            <span className="time">
                                {this.state.nowTime}
                            </span>
                            <span className="weather">
                            
                            </span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         menuName: state.switchMenu.menuName
//     }
// };

//export default connect(mapStateToProps)(Header)
export default Header;
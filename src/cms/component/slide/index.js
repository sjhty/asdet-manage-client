import React, { Component } from 'react'
import { Row, Col, Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import MenuConfig from './menuConfig'
import './index.less'
const { SubMenu } = Menu
const MenuItem = Menu.Item

class Slide extends Component {

    componentWillMount() {
        const menuTree = this.renderMenu(MenuConfig);
        this.setState({
            menuTree
        })
    }

    renderMenu = (menus) => {
        return menus.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} key={item.url}>
                        { this.renderMenu( item.children )}
                    </SubMenu>
                )
            }

            return <MenuItem key={item.url} title={item.title}>
                        <NavLink to={item.url}>
                            {item.icon ? <Icon type={ item.icon }/>: ""}
                            <span>{ item.title }</span>
                        </NavLink>
                    </MenuItem>
        })
    }

    render () {
        return (
            <Col span={4} className="nav_sider" style={{position: "fixed"}}>
                <Row className="asdet_logo">
                    <Col>
                        <span className="logo chin_logo">雅茜•优艾</span>
                        <span className="logo eng_logo">ASDET</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Menu theme="dark" mode="inline" onClick={this.handleLink}>
                            {this.state.menuTree}
                        </Menu>
                    </Col>
                </Row>
            </Col>
        )
    }

    // handleLink = ( { item, key } ) => {
    //     if (key === this.state.currentKey) {
    //         return false;
    //     }

    //     const { dispatch } = this.props;
    //     //console.log(item)
    //     dispatch(switchMenu(item.props.title));

    //     this.setState({
    //         currentKey: key
    //     })
    // }
}

export default Slide;
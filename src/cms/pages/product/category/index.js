import React, { Component, Fragment } from 'react'
import { Card, Button, Table, Modal } from 'antd'
import Api from '../../../../axios/api'
import BaseForm from '../../../component/baseForm'
import { message } from 'antd'
import './index.less'

class Category extends Component {

    state = {
        visible: false
    }

    componentWillMount() {
        this.getCategory()
    }

    getCategory = async () => {
        const result = await Api.findCategory();
        if (result.success === true) {
            this.setState({
                data: result.data.rows
            })
        } else {
            message.error(result.message)
        }
        
    }

    addFormFields = [
        {type: 'INPUT', label: '分类名称', field: 'name', placeholder: '请输入分类名称',value:''},
        {type: 'INPUT', label: '零售价', field: 'price', placeholder: '请输入零售价',value:''},
        {type: 'INPUT', label: 'VIP售价(课长)', field: 'vip_price', placeholder: '请输入VIP售价',value:''},
        {type: 'INPUT', label: '部长售价', field: 'minister_price', placeholder: '请输入部长售价',value:''},
        {type: 'INPUT', label: '理事售价', field: 'director_price', placeholder: '请输入理事售价',value:''},
        {type: 'INPUT', label: '社长售价', field: 'president_price', placeholder: '请输入社长售价',value:''},
        {type: 'BUTTON', label: '添加', className: 'add_btn'}
    ]

    render () {
        const columns = [
            {title: '序号',dataIndex: 'id',align: 'center'},
            {title: '名称',dataIndex: 'name',align: 'center'},
            {title: '零售价',dataIndex: 'price',align: 'center'},
            {title: 'VIP售价(课长)',dataIndex: 'vip_price',align: 'center'},
            {title: '部长售价',dataIndex: 'minister_price',align: 'center'},
            {title: '理事售价',dataIndex: 'director_price',align: 'center'},
            {title: '社长售价',dataIndex: 'president_price',align: 'center'},
            // {title: '创建时间',dataIndex: 'created_at',align: 'center',render: (text) => Moment(text).format('YYYY-MM-DD HH:mm:ss')},
            {title: '操作',dataIndex: 'action',align: 'center',render: (text, item) => <Button type="link" onClick={ () => { this.showModal(item) }}>修改</Button>},
        ];
        return (
            <Fragment>
                <Card title="商品分类" extra={<Button type="primary" onClick={ () => { this.showModal() }} size="small" icon="plus">添加</Button>}>
                    <Table bordered dataSource={this.state.data} columns={columns} rowKey="id"/>
                </Card>
                <Modal title="添加商品分类" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                    <BaseForm formFields={ this.addFormFields } filterSubmit={ this.handleSubmit }/>
                </Modal>
            </Fragment>
        )
    }

    //显示modal表单弹框
    showModal = (item) => {
        this.setState({
          visible: true
        })
        this.handleValue(item)
    }

    handleOk = (e) => {
        this.setState({
          visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    //处理弹框表单的值
    handleValue = (item) => {
        let isId = false;
        this.addFormFields.map( (fields) => {
            if (item) {
                for (let key in item) {
                    if (key === fields.field) {
                        if (key === 'id') {
                            isId = true;
                        }
                        fields.value = item[key];
                    }
                }
            } else {
                fields.value = ''
            }
        })

        if (item && isId === false) {
            const newField = {type: 'INPUT', field: 'id', value:item.id.toString(), className:'hidden'};
            this.addFormFields.push(newField)
        }
    }

    handleSubmit = async (fields, _this) => {
        const result = await Api.addCategory(fields);
        if ( result.success === true ) {
            message.success("分类添加成功");
            this.setState({
                visible: false
            });
            _this.props.form.resetFields();
            this.getCategory();
        } else {
            message.error(result.message)
        }
    }
}

export default Category;
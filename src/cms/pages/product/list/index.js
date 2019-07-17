import React, { Component, Fragment } from 'react'
import { Card, Button, Table, Modal } from 'antd'
import BaseForm from '../../../component/baseForm'
import Utils from '../../../../utils'

class List extends Component {

    state = {
        styleList: [
            {id: '1', name: 'A款'},
            {id: '2', name: 'B款'}
        ],
        sizeList: [
          {id: '1', name: 'S'},
          {id: '2', name: 'M'},
          {id: '3', name: 'L'},
          {id: '4', name: 'XL'},
          {id: '5', name: 'XXL'},
          {id: '6', name: 'XXXL'},
        ],
        colorList: [
          {id: '1', name: '黑色'},
          {id: '2', name: '红色'},
          {id: '3', name: '蓝色'},
          {id: '4', name: '灰色'},
          {id: '5', name: '肤色'},
          {id: '6', name: '粉色'},
        ]
      }

    searchFormFields = [
        {type: 'INPUT', label: '商品名称', field: 'name', placeholder: '请输入商品名称',value:''},
        {type: 'SELECT', label: '商品颜色', field: 'color', placeholder: '请选择商品颜色',value:'0', width: 180, list: this.state.colorList},
        {type: 'SELECT', label: '商品型号', field: 'style', placeholder: '请选择商品型号',value:'0', width: 105, list: this.state.styleList },
        {type: 'SELECT', label: '商品尺寸', field: 'size', placeholder: '请选择商品尺寸',value:'0', width: 105, list: this.state.sizeList },
        {type: 'BUTTON', label: '搜索', className: 'add_btn'}
    ]

    addFormFields = [
        {type: 'INPUT', label: '商品名称', field: 'name', placeholder: '请输入商品名称',value:''},
        {type: 'SELECT', label: '商品分类', field: 'category_id', placeholder: '请选择商品分类',value:'0', width: 180, list: this.state.colorList},
        {type: 'SELECT', label: '商品颜色', field: 'color', placeholder: '请选择商品颜色',value:'0', width: 180, list: this.state.colorList},
        {type: 'SELECT', label: '商品型号', field: 'style', placeholder: '请选择商品型号',value:'0', width: 105, list: this.state.styleList },
        {type: 'SELECT', label: '商品尺寸', field: 'size', placeholder: '请选择商品尺寸',value:'0', width: 105, list: this.state.sizeList },
        {type: 'INPUT', label: '商品库存', field: 'stock', placeholder: '请输入商品库存',value:''},
        {type: 'UPLOAD',label: '上传图片',field: 'imgUrl'},
        {type: 'BUTTON', label: '搜索', className: 'add_btn'}
    ]

    render () {
        const columns = [
            {title: '序号', width: 80, dataIndex: 'id', fixed: 'left', align: 'center'},
            {title: '商品名称', width: 150, dataIndex: 'name', fixed: 'left', align: 'center'},
            // {
            //   title: '商品图片', dataIndex: 'imgUrl', key: 'imgUrl', width: 150, align: 'center',
            //   render: (text) => {
            //     if (text !== '' && text !== 'null') {
            //       let urls = '',urlArr = (text || "").split(',');
            //       urlArr.map( (item) => 
            //         urls += '<img src='+item+' class="table_img" alt='+item+'/>'
            //       )
            //       return <span dangerouslySetInnerHTML={{__html: urls}}></span>
            //     } else {
            //       return ''
            //     }
            //   }
            // },
            {title: '商品分类', width: 150, dataIndex: 'category.name', align: 'center'},
            {
              title: '商品颜色', dataIndex: 'color', width: 100, align: 'center',
              render: (text) => {
                const new_text = Utils.formateAttribute((text || "").split(','), this.state.colorList)
                return new_text.substr(0, new_text.length - 1)
              }
            },
            {
              title: '商品型号', dataIndex: 'style', width: 100, align: 'center',
              render: (text) => {
                return Utils.formateAttribute(text,this.state.styleList)
              },
            },
            {
              title: '商品尺码', dataIndex: 'size', width: 100, align: 'center',
              render: (text) => {
                return Utils.formateAttribute(text,this.state.sizeList)
              }
            },
            { title: '商品库存(件)', dataIndex: 'stock', width: 100, align: 'center', },
            {
              title: '商品售价(元)', dataIndex: 'category.price', width: 100, align: 'center',
            },
            {
              title: 'VIP售价(元)', dataIndex: 'category.vip_price', width: 100, align: 'center',
            },
            {
              title: '部长售价(元)', dataIndex: 'category.minister_price', width: 100, align: 'center',
            },
            {
              title: '理事售价(元)', dataIndex: 'category.director_price', width: 100, align: 'center',
            },
            {
              title: '社长售价(元)', dataIndex: 'category.president_price', width: 100, align: 'center',
            },
            {
              title: '操作',
              fixed: 'right',
              width: 100,
              align: 'center',
              render: ( text, item ) => {
                return <span>
                        <Button size="small" onClick={ () => { this.showModal('edit',item) }}>修改</Button>
                        <Button size="small" onClick={ () => { this.showModal('edit_stock',item) }}>入库</Button>
                       </span>
              }
            },
        ]
        const data = [
            {id: 1, name: '樱桃裤', color: '1', style: '1', size: '1', stock: 5, category:{ name: '樱桃裤', price: 208, vip_price: 150, minister_price: 125, director_price: 110, president_price: 100}},
            {id: 2, name: '樱桃裤', color: '2', style: '2', size: '2', stock: 15, category:{ name: '樱桃裤', price: 208, vip_price: 150, minister_price: 125, director_price: 110, president_price: 100}}
        ]
        return (
            <Fragment>
                <Card title="商品信息" extra={<Button type="primary" onClick={ () => { this.showModal() }} size="small" icon="plus">添加商品</Button>}>
                    <BaseForm formFields={ this.searchFormFields } filterSubmit={ this.handleSubmit }/>
                </Card>
                <Card>
                    <Table bordered dataSource={data} columns={columns} rowKey="id" scroll={{ x: 1330, y: 800 }}/>
                </Card>
                <Modal title="添加商品" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
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
        //this.handleValue(item)
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
}

export default List;
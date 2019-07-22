import React, { Component } from 'react'
import { Form, Input, Select, Button, Upload, Icon } from 'antd'
import Api from '../../../axios/api'
import Utils from '../../../utils'
const FormItem = Form.Item

class BaseForm extends Component {

    handleFilterSubmit = () => {
        this.props.form.validateFields( (err,value) => {
            console.log("value",value)
            if (!err) {
                this.props.filterSubmit(value, this);
                //this.props.form.resetFields();
            } else {
                console.log("校验失败")
            }
        })
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    initForm = () => {
        //this.props.form.resetFields();
        const { getFieldDecorator } = this.props.form;
        const formFields = this.props.formFields;
        const formFieldList = [];
        if ( formFields && formFields.length > 0 ) {
            formFields.forEach( (item) => {
                let label = item.label;  //表单属性名称
                let field = item.field;  //表单字段名称
                let placeholder = item.placeholder;
                let className = item.className;
                let value = item.value;
                let width = item.width;
                let disabled = item.disabled;

                if (item.type === 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                rules:[
                                    { required: true, message: '不能为空'}
                                ],
                                initialValue: value
                            })(
                                <Input placeholder={placeholder} className={ className }/>
                            )
                        }
                    </FormItem>
                    formFieldList.push(INPUT);

                } else if (item.type === 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                rules:[
                                    { required: true, message: '请选择'}
                                ],
                                initialValue: value
                            })(
                                <Select key={field} style={{width:width}}>
                                    {
                                        Utils.getOptionList(item.list)
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    formFieldList.push(SELECT);
                } else if (item.type === 'BUTTON') {
                    const BUTTON = <FormItem key="btn" className={className}>
                        <Button type="primary" style={{ marginRight: "10px" }} onClick={this.handleFilterSubmit}>{label}</Button>
                    </FormItem>
                    formFieldList.push(BUTTON);
                } else if (item.type === 'UPLOAD') {
                    // let env = process.env.NODE_ENV,uploadUrl=''; 
                    // if (env === 'development') {
                    //     uploadUrl = 'http://127.0.0.1:7001/api/upload';
                    // } else {
                    //     uploadUrl = 'http://49.234.12.142:7001/asdet/api/upload';
                    // }
                    const UPLOAD = <FormItem key={field} label={label}>
                        {
                            getFieldDecorator(field, {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile
                            })(
                                <Upload name="logo" action={Api.upload} listType="picture" disabled={disabled}> 
                                    <Button>
                                        <Icon type="upload" /> 点击上传
                                    </Button>
                                </Upload>
                            )
                        }
                    </FormItem>
                    formFieldList.push(UPLOAD);
                }
            })
        }

        return formFieldList;
    }

    render () {
        return (
            <Form layout = 'inline'>
                {this.initForm()}
            </Form>
        )
    }
}

export default Form.create({})(BaseForm);
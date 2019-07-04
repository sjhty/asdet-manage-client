import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd'
import Utils from '../../../utils'
const FormItem = Form.Item

class BaseForm extends Component {
    initForm = () => {
        const { getFieldDecorator } = this.props.form;
        const formFields = this.props.formFields;
        const formFieldList = [];
        if ( formFields && formFields.length > 0 ) {
            formFields.forEach( (item) => {
                let label = item.label;  //表单属性名称
                let field = item.field;  //表单字段名称
                let placeholder = item.placeholder;
                let className = item.className;

                if (item.type === 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                rules:[
                                    { required: true, message: '不能为空'}
                                ]
                            })(
                                <Input placeholder={placeholder}/>
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
                                ]
                            })(
                                <Select key={field}>
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
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Form,
  Icon,
  Input,
  Button
} from 'antd'
import { request } from '../../lib'
import './login.sass'
const FormItem = Form.Item

@Form.create()
export default class Detail extends Component {
  constructor (props) {
    super(props)
    console.log('传到详情页的props是:', props)
    this.state = {
     loading: false
    }
  }
_toggleLoading = (status= false) => {
  this.setState({
    loading:status
  })
}
_handleSubmit = (e) => {
  e.preventDefault()
  this.props.form.validateFields(async (err, values) => {
    if(!err){
      request(this._toggleLoading)({
        method: 'post',
        url: '/admin/login',
        data: {
          ...values
        }
      }).then(res => {
        this.props.history.replace('/admin/list')
      })
    }
  })
}
  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <Form onSubmit = {this._handleSubmit} className='login-form'>
          <h3 style={{ textAlign: 'center' }}>电影预告片后台</h3>
          <FormItem>
            {
              getFieldDecorator('email', {
                rules: [{
                  required: true,
                  message: '请填入邮箱!'
                }]
              })(
                <Input prefix={<Icon type='user' style={{ fontSize: 13 }}></Icon> } placeholder='Email'></Input>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '请填入密码!'
                }]
              })(
                <Input type='password' prefix={<Icon type='eye-invisible' style={{ fontSize: 13 }}></Icon> }
                 placeholder='Password'></Input>
              )
            }
          </FormItem>
          <FormItem>
            <button type="dashed" style={{ width: '100%' }} htmltype='submit'  loading={this.state.loading}>Log In</button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

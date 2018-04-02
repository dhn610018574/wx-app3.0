import React, { Component } from "react";
import PropTypes from "prop-types";
import { Login } from "../../components";

/**
 * LoginContainer 负责逻辑业务处理，加载，保存，提交
 */
export default class LoginContainer extends Component {
  static propTypes = {
    phone: PropTypes.any
  };
  constructor() {
    super();
    this.state = { phone: "",password:'' };
  }
  handlePhoneInputBlur(value){
    this.setState({
      phone:value
    })
  }
  handlePasswordInputBlur(value){
    this.setState({
      password:value
    })
  }
  handleSubmit(){
    let {phone,password} = this.state;
    if(!phone.trim()) return alert('请输入手机号');
    if(!password.trim()) return alert('请输入密码');
    //发送请求
    
  }
  render() {
    return (
      <Login
        phone={this.state.phone}
        password={this.state.password}
        onSubmit={this.handleSubmit.bind(this)}
        onPhoneInputBlur={this.handlePhoneInputBlur.bind(this)}
        onPasswordInputBlur={this.handlePasswordInputBlur.bind(this)}
      />
    );
  }
}

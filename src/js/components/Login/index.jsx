import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./index.scss";
export default class Login extends Component {
  static propTypes = {
    phone: PropTypes.any,
    password: PropTypes.any,
    onSubmit: PropTypes.func,
    onPhoneInputBlur: PropTypes.func,
    handlePasswordInputBlur: PropTypes.func,
    onClear: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      phone: props.phone,
      password: props.password
    };
  }
  set(e) {
    let { name, value } = e.target;
    this.setState({
      [`${name}`]: value
    });
  }
  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        phone: this.state.phone,
        password: this.state.password
      });
    }
  }
  handlePhoneInputBlur(e) {
    if (this.props.onPhoneInputBlur) {
      this.props.onPhoneInputBlur(e.target.value);
    }
  }
  handlePasswordInputBlur(e) {
    if (this.props.onPasswordInputBlur) {
      this.props.onPasswordInputBlur(e.target.value);
    }
  }

  render() {
    return (
      <div className="login">
        <div className={styles.loginTop}>
          <div className={styles.logogif} />
          <div className={styles.back} />
        </div>
        <div className={styles.loginInput}>
          <div className={styles.phone}>
            <div className={styles.phoneIcon} />
            <input
              type="tel"
              name="phone"
              maxLength="11"
              placeholder="请输入手机号"
              onChange={e => this.set(e)}
              onBlur={this.handlePhoneInputBlur.bind(this)}
            />
            <div className={styles.clearIcon} />
          </div>
          <div className={styles.password}>
            <div className={styles.passwordIcon} />
            <input
              type="password"
              name="password"
              placeholder="请输入密码"
              onChange={e => this.set(e)}
              onBlur={this.handlePasswordInputBlur.bind(this)}
            />
            <div
              className={styles.clearIcon}
            />
          </div>
          <button onClick={this.handleSubmit.bind(this)}>登录</button>
          <div className={styles.register}>
            <a href="#">忘记密码</a>
            <a href="#">快速注册</a>
          </div>
        </div>
        <div className={styles.footer} />
      </div>
    );
  }
}

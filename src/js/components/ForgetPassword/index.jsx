import React, { Component } from "react";
import Header from "../Header";
import styles from './index.scss';
export default class ForgetPassword extends Component {
  render() {
    return (
      <div className={styles.forgetPassword}>
        <Header title="忘记密码" />
        <div className={styles.verifyInput}>
          <div className={styles.tel}>
          <input type="tel" placeholder='请输入手机号'/>
          <div className={styles.clearIcon}></div>
            <button className={styles.verifyBtn}>获取验证码</button>
          </div>
          <div className={styles.verify}><input type="text" placeholder='请输入验证码'/></div>
        </div>
        <p className={styles.protocol}><i className={styles.choose}></i>我已阅读并同意<a href="javascript:;" className={styles.proto}>《信而富平台注册协议》</a></p>
        <button className='btn'>下一步</button>
      </div>
    );
  }
}

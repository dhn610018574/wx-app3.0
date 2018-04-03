import React, { Component } from "react";
import styles from './index.scss';
export default class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:props.title
    }
  }
  render(){
    return(
      <div className={styles.header}>
        <div className={styles.headerBack}></div>
        <div className={styles.title}>{this.state.title}</div>
      </div>
    )
  }
}
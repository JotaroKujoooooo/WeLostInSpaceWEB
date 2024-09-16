import React, { Component } from 'react'
import "../styles/Home.css"
export default class Home extends Component {
  render() {
    return (
        <div className="home">
        <strong  style={{fontSize:"3vw"}}>Добро пожаловать на сайт We Lost In Space</strong>
        <text style={{fontSize:"2vw"}}>Официальный сайт первой в России зарегистрированной музыкальной группы, 
        которая за 5 лет не выпустила ни одного полноценного релиза и стала общественным достоянием в кругу 3-х человек.</text>
        </div>
    )
  }
}

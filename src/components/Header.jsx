import React, { Component, setState, useEffect, useState } from "react";
import { FormControl, Navbar, Nav, Button, Container, Form, NavbarText } from "react-bootstrap";
import logo from "./logo.png";
/* import "./styles/header.css"; */
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import Albums from "../Pages/Albums.jsx"
import Artists from "../Pages/Artists.jsx"
import Login from "../Pages/Login.jsx"
import Messages from "../Pages/Messages.jsx"
import Merche from "../Pages/Merche.jsx";
import Projects from "../Pages/Projects.jsx";
import axios from "axios";
export default function Header()
{
    const [isAuth, setIsAuth]=useState(false);
    const [ip, setIp]=useState();
    useEffect(()=>{
        const apiUrl="https://api.ipify.org/?format=json";
        axios.get(apiUrl).then((resp)=> {
            const art=resp.data;
            setIp(art);
        });
    }, [setIp]);
    useEffect(()=>{
        const apiUrl="https://api.ipify.org/?format=json";
        axios.put(apiUrl,
            {
                ip:ip
            }
        ).then((resp)=>{
            const art=resp.data;
            setIsAuth(art);
        })
    }, [setIsAuth])
        return (
            <>
            {console.log(ip)}
            {console.log(isAuth)}
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" style={{width:'100vw',paddingRight:'0px'}}>
                <Container style={{marginLeft:'1vw', maxWidth:'98vw'}}>
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            height="40"
                            width="120"
                            className="d-flex align-top"
                            alt="Logo"
                        />  
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/Albums">Альбомы</Nav.Link>
                            <Nav.Link href="/Artists">Артисты</Nav.Link>
                            <Nav.Link href="/Merches">Мерч</Nav.Link>
                            <Nav.Link href="/Projects">Сторонние проекты</Nav.Link>
                            <Nav.Link href="/Messages">Форум</Nav.Link>
                            <Nav.Link href="/Login">Войти или зарегистрироваться</Nav.Link>
                        </Nav>
                        <NavbarText style={{marginRight:"1vw", justifyContent:"center"}}>Разработано компанией Russian Digital совместно с VanyaTulpa inc</NavbarText>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/Albums" element={<Albums/>} />
                    <Route exact path="/Artists" element={<Artists/>} />
                    <Route exact path="/Merches" element={<Merche/>} />
                    <Route exact path="/Projects" element={<Projects/>} />
                    <Route exact path="/Login" element={<Login/>} />
                    <Route exact path="/Messages" element={<Messages/>} />
                    <Route exact path="/Login" element={<Login/>} />
                </Routes>
            </Router>
            </>
        );
}
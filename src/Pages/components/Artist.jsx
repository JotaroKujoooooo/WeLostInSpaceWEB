import React, { Component, useState } from 'react'
import "../components/styles/Albums.css"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import axios from 'axios'
const Artist = function(props)
{
    const [show, setShow]=useState();
    const apiUrl="http://localhost:5259/Artist"
    const delArtist=function(){
      const art_id=props.artists.id
      axios.delete(apiUrl+"/"+art_id).then(()=>window.location.reload())
    }
    return (
      <div className="albums">
        <button style={{fontSize:"1.5vw", border:"none", backgroundColor:"rgb(0,0,0,0)"}} onClick={()=>setShow(true)}>{props.artists.name}</button>
        <text style={{display:"grid", fontSize:"1vw"}}>{props.artists.role}</text>
        <Modal show={show} onHide={()=>setShow(false)} style={{backgroundColor:"rgb(0,0,0,0.4)"}}>
          <ModalHeader closeButton>
            <ModalTitle>{props.artists.name}</ModalTitle>
          </ModalHeader>
          <ModalBody>
          <text style={{display:"grid", fontSize:"1vw"}}>Описание исполнителя: {props.artists.role}</text>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={()=>setShow(false)}>Закрыть</Button>
            <Button variant="primary" /* onClick={delArtist} */>Удалить</Button>
            <Button variant="primary">Изменить</Button>
          </ModalFooter>
        </Modal>
        </div>
    )
}

export default Artist

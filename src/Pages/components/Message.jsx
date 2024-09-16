import React, { useState } from 'react'
import "./styles/Messages.css"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, FormControl } from 'react-bootstrap';

function Message(props) {
  const [show, setShow]=useState(false);
  const [title, setTitle]=useState(props.message.name);
  const [mstitle, setMstitle]=useState(props.message.messageText);
  const handleClose=()=>setShow(false);
  const handleShow=()=>setShow(true);
  const deletePost=function()
  {
    const userid=props.message.id;
    axios.delete("http://localhost:5259/Message/"+userid).then(()=>{window.location.reload()});
  }
  const put=function()
  {
    const name=title;
    const ms=mstitle;
    const userid=props.message.id;
    axios.put("http://localhost:5259/Message/"+userid, {
      name: name,
      messageText: ms,
    }).then(()=>{window.location.reload()});
  }
  return (
    <div>
    <div className="post">
        <strong style={{fontSize:"1.5vw"}}>Пользователь: {props.message.name}</strong>
        <text style={{fontSize:"1vw"}}>Сообщение: {props.message.messageText}</text>
        <button className='me-sm-2 form-control'style={{width:"9vw", display:"inline", fontSize:"1vw", marginLeft:"87vw"}} onClick={handleShow}>Редактировать</button>
        <button className='me-sm-2 form-control' style={{width:"9vw", display:"inline", fontSize:"1vw", marginLeft:"87vw"}} onClick={deletePost}>Удалить</button>
        <Modal show={show} onHide={handleClose} style={{backgroundColor:"rgb(0,0,0,0.4)"}}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <FormControl type="text" placeholder="Имя" className="me-sm-2" id={props.message.id} value={title} required onChange={e=>setTitle(e.target.value)}/>
            <FormControl type="text" placeholder="Сообщение" className="me-sm-2" id={props.message.id} value={mstitle} required onChange={e=>setMstitle(e.target.value)}/>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={put}>
            Сохранить изменения
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  )
}

export default Message
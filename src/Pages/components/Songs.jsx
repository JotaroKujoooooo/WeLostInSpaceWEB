import React, { useState } from 'react'
import { Button, Form, FormControl, FormSelect, Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'
import "./styles/Albums.css"
import axios from 'axios'
export default function(props) {
const[show,setShow]=useState();
const songId=props.song.id;
const[title, setTitle]=useState(props.song.title);
const put=function()
    {
        const name=title;
        const albumId=props.alb;
        const art="de3b44f9-c0b3-4d4c-bb03-401b013c0984";
        console.log(songId);
        console.log(title);
        axios.put("http://localhost:5259/Songs/"+songId, {
            title: title,  
          }).then(()=>{window.location.reload()});
/*           sleep(10000); */
/*           window.location.reload(); */
    }
const delSong=()=>
    {
        axios.delete("http://localhost:5259/Songs/"+songId).then(()=>{window.location.reload()});
    }

  return (
    <div className='albums'>
        <strong>{props.artist} - {props.song.title}</strong>
        <Button variant="secondary" style={{marginLeft:"10%"}} onClick={delSong}>Удалить</Button>
        <Button variant="primary" style={{marginLeft:"2%"}} onClick={()=>setShow(true)}>Редактировать</Button>
        <Modal show={show} onHide={()=>setShow(false)} style={{backgroundColor:"rgb(0,0,0,0.4)"}}>
            <ModalHeader closeButton>
                <ModalTitle>Изменение песни</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormControl type ="text" placeholder='Название песни' className="me-sm-2" id ={props.song.id} value={title} onChange={e=>setTitle(e.target.value)}/>
                </Form>
            </ModalBody>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShow(false)}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={put}>
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

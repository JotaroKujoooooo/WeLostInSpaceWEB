import React, { Component, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Artist from "./components/Artist.jsx"
import { Button, FormControl, Modal, ModalBody, ModalHeader, ModalTitle, Form, ModalFooter } from 'react-bootstrap';
const Artists=function()
{
    const [artists, setArtists] = useState();
    useEffect(()=>{
        const apiUrl="http://localhost:5259/Artist";
        axios.get(apiUrl).then((resp)=> {
            const art=resp.data;
            setArtists(art);
        });
    }, [setArtists]);
    const[show,setShow]=useState();
    const title=useRef();
    const des=useRef();
    const addArtist = function()
    {
        const apiUrl="http://localhost:5259/Artist";
        const name=title.current.value;
        const description=des.current.value;
        axios.post(apiUrl, {
            name:name,
            role:description,
        }).then(()=>{window.location.reload()});
    }
    return (
      <div>
        {
            artists?.map(artist=>
                <Artist artists={artist} name={artist.name} role={artist.role} key={artist.id} />
            )
        }
        <Button style={{width:"10vw", marginLeft:"45vw", marginTop:"2vh"}} onClick={()=>setShow(true)}>Добавить</Button>
        <Modal show={show} onHide={()=>setShow(false)} style={{backgroundColor:"rgb(0,0,0,0.4)"}}>
            <ModalHeader closeButton>
                <ModalTitle>Добавление артиста</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormControl type="text" placeholder="Имя артиста" className="me-sm-2" ref={title}/>
                    <FormControl type="text" placeholder='Роль артиста' className='me-sm-2' ref={des}/>
                </Form>
            </ModalBody>
            <ModalFooter>
            <Button variant="secondary" onClick={()=>setShow(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addArtist}>
                        Сохранить изменения
                    </Button>
            </ModalFooter>
        </Modal>
      </div>
    )
}
export default Artists
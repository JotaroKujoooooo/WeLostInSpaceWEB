import axios from 'axios'
import React, { Component, useEffect, useRef, useState } from 'react'

import Modalw from './components/Modalw.jsx';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';

const Albums = function()
{
    const [show, setShow]=useState(false);
    const [title, setTitle]=useState();
    const des=useRef();
    const [albums, setAlbums]=useState();
    useEffect(()=> {
        const apiUrl="http://localhost:5259/Albums";
        axios.get(apiUrl).then((resp) =>{
            const titles=resp.data;
            setAlbums(titles);
        });
    }, [setAlbums]);
    const addAlbum=function()
    {
        const apiUrl='http://localhost:5259/Albums';
        const description=des.current.value;
        axios.post(apiUrl, {
            title: title,
            description: description,
        }).then(()=>{window.location.reload()})
    }
    return (
        <div>
            <strong className='albums' style={{fontSize:"300%"}}>Список альбомов</strong>
            {
                albums?.map(album =>

                        <Modalw album={album} key={album.id} title={album.title} description={album.description} songs={albums.songs}/>
                )
            }
            <div style={{display:"flex"}}>
            <Button style={{marginLeft:"auto", marginRight:"auto", marginTop:"2vh"}} onClick={()=>setShow(true)}>Добавить альбом</Button>
            </div>
            <Modal show={show} onHide={()=>setShow(false)} style={{backgroundColor:"rgb(0,0,0,0.4)"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление альбома</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormControl type="text" placeholder="Название альбома" className="me-sm-2" value={title} required onChange={e=>setTitle(e.target.value)}/>
                        <FormControl type="text" placeholder="Описание альбома" className="me-sm-2" ref={des}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShow(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addAlbum}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )

}
export default Albums 
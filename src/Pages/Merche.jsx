import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Button, Modal, Form, FormControl, ModalHeader, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';

export default function () {
    const title_mr=useRef();
    const des=useRef();
    const cost=useRef();
    const[merche, setMerche]=useState();
    const [show, setShow]=useState();
    const apiUrl="http://localhost:5259/Merches";
    const addMerche=function(){
        const title=title_mr.current.value;
        const description=des.current.value;
        const cosst=cost.current.value;
        axios.post(apiUrl, {
            title:title,
            description:description,
            price:cosst,
        }).then(()=>window.location.reload());
    }
useEffect(()=>{

    axios.get(apiUrl).then((resp)=> {
        const art=resp.data;
        setMerche(art);
    });
}, [setMerche]);
    return (
    <div>
        <div>
            {merche?.map(merches=>
            <div style={{border:"0.3vw solid black", display:"grid", margin:"0.5%", textAlign:"center"}} merches={merches} key={merches.id} name={merches.title} des={merches.description} cost={merches.price}>
                <strong style={{fontSize:"350%"}}>{merches.title}</strong>
                <h1 style={{textAlign:"left", paddingLeft:"1%"}}>Описание: {merches.description}</h1>
                <h1 style={{textAlign:"left", paddingLeft:"1%"}}>Цена: {merches.price}</h1>
            </div>
            )}
        </div>
        <Button style={{width:"10vw", marginLeft:"45vw", marginTop:"2vh"}} onClick={()=>setShow(true)}>Добавить</Button>
        <Modal show={show} onHide={()=>setShow(false)} style={{backgroundColor:"rgb(0,0,0,0.4)"}}>
            <ModalHeader closeButton>
                <ModalTitle>Добавление мерча</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormControl type="text" className="me-sm-2" placeholder="Имя мерча" ref={title_mr}/>
                    <FormControl type="text" className="me-sm-2" placeholder="Описание мерча" ref={des}/>
                    <FormControl type="number" className="me-sm-2" placeholder="Цена" ref={cost}/>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={()=>setShow(false)}>Закрыть</Button>
                <Button variant="primary"  onClick={addMerche}>Добавить</Button>
            </ModalFooter>
        </Modal>
    </div>
  )
}

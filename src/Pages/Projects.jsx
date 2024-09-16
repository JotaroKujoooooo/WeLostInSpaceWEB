import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';

export default function Projects() {
    const apiUrl="http://localhost:5259/Project";
    const addProject=function()
    {
        const title=title_pr.current.value;
        const description=des.current.value;
        axios.post(apiUrl, {
            title:title,
            description: description,
        }).then(()=>window.location.reload());
    }

    const [show, setShow]=useState();
    const[projects, setProjects]=useState();
    const title_pr=useRef();
    const des=useRef();
    useEffect(()=>{

        axios.get(apiUrl).then((resp)=> {
            const art=resp.data;
            setProjects(art);
        });
    }, [setProjects]);
  return (
    <div style={{textAlign:"center"}}>
        <strong style={{fontSize:"250%",  marginTop:"0.5%"}}>Наше творчество помимо музыки</strong>
        {projects?.map(project =>
            <div style={{border:"0.3vw solid black", display:"grid", margin:"0.5%"}} project={project} key={project.id} title={project.title} des={project.description}>
                <strong style={{fontSize:"250%"}}>{project.title}</strong>
                <h3>Описание: {project.description}</h3>
            </div>
        )}
        <Button onClick={()=>setShow(true)}>Добавить</Button>
        <Modal show={show} onHide={()=>setShow(false)} style={{backgroundColor:"rgb(0,0,0,0.4)"}}>
            <ModalHeader closeButton>
                <ModalTitle>Добавление проекта</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormControl type="text" className="me-sm-2" placeholder="Имя проекта" ref={title_pr}/>
                    <FormControl type="text" className="me-sm-2" placeholder="Описание проекта" ref={des}/>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={()=>setShow(false)}>Закрыть</Button>
                <Button variant="primary" onClick={addProject}>Добавить</Button>
            </ModalFooter>
        </Modal>
    </div>
  )
}

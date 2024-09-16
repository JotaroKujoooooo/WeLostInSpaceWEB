import React, { useState, useEffect, useRef } from 'react';
import Message from "./components/Message.jsx"
import axios from 'axios';
import "./components/styles/Messages.css"
import { Button, Form, FormControl } from 'react-bootstrap';

const Messages =function() {
    const [messages, setMessage]=useState();
    useEffect(()=>{
        const apiUrl="http://localhost:5259/Message";
        axios.get(apiUrl).then((resp)=> {
            const art=resp.data;
            setMessage(art);
        });
    }, [setMessage]);
    const [title, setTitle]=useState();
    const mes=useRef();
    const addPost=() =>
        {
            const apiUrl="http://localhost:5259/Message";
            const name=title
            const tx=mes.current.value
            console.log(name);
            console.log(tx);
            axios.post(apiUrl, {name:name, messageText:tx}).then(()=>{window.location.reload()});
        };
  return (
    <div>
        {messages?.map(message =>
        <Message message={message} name={message.name} text={message.messageText} key={message.id} />
        )}
        <div className='send'> 
        <Form>
            <FormControl type="text" placeholder="Имя" className="me-sm-2" value={title} onChange={e=>setTitle(e.target.value)}/>
            <FormControl type="text" placeholder="Сообщение" className="me-sm-2" ref={mes} />
            <button className="me-sm-2 form-control" onClick={addPost}>Отправить</button>
        </Form>
        </div>
    </div>
  )
}
export default Messages;
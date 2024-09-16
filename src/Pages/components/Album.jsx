import React, { Component, useState } from 'react'
import "../components/styles/Albums.css"
import { useParams, Route, Router, Routes } from 'react-router-dom'
import AlbumPage from './Modal.jsx'
const Album=(props) =>
{
  const [modalActive, setModalActive]=useState(true, true);
/*   const api=props.albums.id */
    return (
        <div className="albums">
          <button style={{fontSize:"1.5vw", border:"none", backgroundColor:"white"}} onClick={() => setModalActive(true)}>{props.albums.title}</button>
{/*           {
          props.albums.songs?.map(song=>
            <div style={{display:"grid", fontSize:"1vw"}}>{song}</div>
          )
          } */}

        </div>
    )
}
export default Album; 

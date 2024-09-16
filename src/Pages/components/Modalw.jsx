import React, { useRef, useState, useEffect } from 'react'
import './styles/AlbumPage.css'
import { ModalBody, ModalHeader, ModalTitle, Button, Form, FormControl, FormSelect, FormLabel, ModalFooter } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ArtistChoose from './ArtistChoose.jsx';
import Songs from './Songs.jsx';

 const Modalw = (props) => {


  const [artists, setArtists] = useState();
  useEffect(()=>{
      const apiUrl="http://localhost:5259/Artist";
      axios.get(apiUrl).then((resp)=> {
          const art=resp.data;
          setArtists(art);
      });
  }, [setArtists]);
  const[show2, setShow2]=useState();
  var k=0;
  const [show, setShow]=useState();
  const [ashow, setAshow]=useState();
  const [songtitle, setSongtitle]=useState();
  const [albumName, setAlbumName]=useState(props.album.title);
  const [albumDes, setAlbumDes]=useState(props.album.description)
  const des=useRef();
  const art=artists?.map(artist=>artist.id)

  const art_name=props.album.songs?.map(song=>song.artists?.map(name=>name.name))
  const [_value, setValue]=useState();
  const albumPut=()=>{
    const title=albumName;
    const description=albumDes;
    const albumId=props.album.id;
    axios.put("http://localhost:5259/Albums/"+albumId, {
      title:title,
      description:description,
    }).then(()=>{window.location.reload()});
  }

  
const addSong=function()
{
  const albumId=props.album.id;
  const artistId=_value;
  const apiUrl="http://localhost:5259/Songs"
  axios.post(apiUrl,{
    title: songtitle,
    artistsId:[artistId],
    albumId:albumId,
  }).then(()=>{window.location.reload()});
}
const del=()=>{
const apiUrl="http://localhost:5259/Albums/"
const albumId=props.album.id;
axios.delete(apiUrl+albumId).then(()=>{window.location.reload()});
}

const handleClose=()=>setShow(false);
const handleShow=()=>setShow(true);
  return (
    <div  className="albums">
      <div>
        <button style={{ border:"0.3vw solid black", fontSize:"1.5vw", backgroundColor:"rgba(0,0,0,0)", height:"auto", width:"30vw", marginLeft:"35vw", marginRight:"35vw"}} onClick={handleShow}>{props.album.title}</button>
      </div>
        <Modal show={show} onHide={handleClose} style={{justifyContent:"center", backgroundColor:"rgb(0,0,0,0.4)"}}>
          <ModalHeader  style={{textAlign:"center",display:"grid"}} closeButton>
              <ModalTitle>{props.album.title}</ModalTitle>
              <Button variant="primary" style={{marginLeft:"auto", marginRight:"auto", marginTop:"1vh"}}onClick={()=>setShow2(true)}>
                Редактировать
              </Button>
              <Button variant="secondary" style={{marginLeft:"auto", marginRight:"auto", marginTop:"0.5vh"}} onClick={del}>
                Удалить альбом
              </Button>
          </ModalHeader>
          <ModalBody>
            <strong className='description' style={{fontSize:"250%"}}>Описание альбома: {props.album.description}</strong>
            <text className='albums' style={{fontSize:"250%"}}>Список песен:</text>
            {props.album.songs?.map(song=>
                <Songs song={song} key={song.id} title={song.title} alb={props.album.id} artist={song.artists[0].name} >
                  {console.log(art_name)}
                </Songs>
            )}
          </ModalBody>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={()=>setAshow(true)}>
              Добавить песню
            </Button>
          </Modal.Footer>
      </Modal>
      <Modal show={ashow} onHide={()=>setAshow(false)} style={{backgroundColor:"rgb(0,0,0,0.4)", paddingTop:"auto", paddingBottom:"auto"}}>
        <ModalHeader closeButton>
            <ModalTitle>Добавление песни</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormControl type="text" placeholder="Название песни" className="me-sm-2" value={songtitle} onChange={e=>setSongtitle(e.target.value)}/>
            <FormLabel style={{margin:"1%"}}>Выберите исполнителя</FormLabel>
            <FormSelect value={_value} onChange={(event)=>setValue(event.target.value)}>
              {artists?.map(artist=>
                <option artist={artist} key={artist.id} name={artist.name} value={artist.id}>{artist.name}</option>
              )}
            </FormSelect>
           
          </Form>
        </ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setAshow(false)}>
             Закрыть
          </Button>
          <Button variant="primary" onClick={addSong}>
               Сохранить изменения
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={()=>setShow2(false)} style={{backgroundColor:"rgb(0,0,0,0.4)"}}>
            <ModalHeader>
              <ModalTitle>Редактирование альбома</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormControl type="text" placeholder="Название альбома" className="me-sm-2" id={props.album.id} value={albumName} required onChange={e=>setAlbumName(e.target.value)}/>
                <FormControl type="text" placeholder="Описание альбома" className="me-sm-2" id={props.album.id} value={albumDes} required onChange={e=>setAlbumDes(e.target.value)}/>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={()=>setShow2(false)}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={albumPut}>
                Сохранить изменения
            </Button>
            </ModalFooter>
      </Modal>
</div>
  )
}
export default Modalw;


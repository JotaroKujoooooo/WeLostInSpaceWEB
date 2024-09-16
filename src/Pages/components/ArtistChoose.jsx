import React, { useRef } from 'react'

export default function (props) {
  const artt=useRef(props.art);

  return (
        <option ref={artt}>{props.artist.id}</option>
  )
}

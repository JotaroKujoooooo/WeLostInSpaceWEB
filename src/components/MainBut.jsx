import React, { useState } from 'react';

const MainBut = (props) => {

    return (
        <div className="sett">
            <a href={props.a.new} className="sett_but">{props.a.title}</a>
        </div>
    );
};

export default MainBut;
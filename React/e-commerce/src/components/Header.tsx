import React from 'react';

function  Header({name,bck,pad}:{name:string; bck:string;pad:number}){
    return (
    <div style={{background:bck, padding:pad, width:400}}>
        <h1>This is the new file {name}</h1>
        <p>
            What do you want me to say?
        </p>
        
    </div>
    )
}

export default Header
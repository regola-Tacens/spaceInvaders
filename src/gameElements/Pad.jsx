import React from 'react';


export function Pad ({padRef, onRightClick, onLeftClick, onMouseOver}){


    return <> 
        <div ref={padRef} className="padControl" id='padControl'></div>
        {/* <button className='btn btn-outline-danger btn-sm' 
                id='controlButtons'
                onMouseOver={onLeftClick}>
                L
        </button>
        <button className='btn btn-outline-danger btn-sm' 
                id='controlButtons'
                onMouseOver={onMouseOver}>
                STOP
        </button>
        <button className='btn btn-outline-danger btn-sm' 
                id='controlButtons'
                onMouseOver={onRightClick}>
                    R
        </button> */}

     </>
}



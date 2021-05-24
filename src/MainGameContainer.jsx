import React, { useEffect, useRef, useState} from 'react';
import { Pad } from './gameElements/Pad';
import {LaserContainer} from './gameElements/laser'
// import {handleCreateLaser} from './gameElements/laser'
import {InvadersContainer} from './gameElements/Aliens'
import { Score } from './gameElements/Score';
import { Background } from './gameElements/Background';
import { Player } from './gameElements/Player';
import { usePlayer } from './hooks/players';


let rightTimerId;
let leftTimerId;
let isGoingRight = false;
let isGoingLeft = false;

export function MainGameContainer (){
    
    const padRef = useRef(null);
    const stepsToRight = useRef(0);
    const [lasersOnScreen, setLasers] = useState([]);
    const [invaders, setInvaders]  =useState([]);
    const [score, setScore] = useState(0);
    const[isGameOver, setGameOver] = useState(false);
    // const [player, setPlayer] = useState(null);
    const {players, fetchPlayers, deletePlayer,addPlayer} = usePlayer()
    const [alienSpeed, setAlienSpeed] = useState(20)
    
    useEffect(()=>{
        // console.log('ok render')
        MovePadRight()
    },[])

    useEffect(()=>{
        fetchPlayers()
    },[])

    const control = function (e){
        if ( e.key ==='ArrowLeft'){
            MovePadLeft()
        } else if (e.key === 'ArrowRight'){
            console.log('going right with key')
            MovePadRight()
        } 
        else if (e.key === 'ArrowUp'){
            stopPad()
        } 
    }

   

    useEffect(()=>{
        console.log('add event listener for key control')
        //add event listener
        window.addEventListener('keyup', control)

        //remove on cleanUp
        return ()=>{
             window.removeEventListener('keyup', control)
        }
    },[])
    

    // ------------DEPLACEMENT PAD -----------------//

    const stopPad = function (){
        // console.log('ok stop pad')
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
        isGoingRight = false;
        isGoingLeft =false;
    };


    const shoot = function (){
        stopPad()
    }
    
    const MovePadRight = function(){ 
        // console.log('move right',padRef.current.style.left)
            isGoingLeft=false;
            clearInterval(leftTimerId)

            if(!isGoingRight){
                
                rightTimerId = setInterval(()=>{
                    isGoingRight = true;
                    stepsToRight.current += 2;
                    padRef.current.style.left = stepsToRight.current + 'px'
                    // console.log(parseInt(padRef.current.style.left,10))
                    if( parseInt(padRef.current.style.left,10) > 534){
                        stopPad()
                    }
                
                },10)
            }
    }

    const MovePadLeft = function(){ 
        // console.log('move left',padRef.current.style.left)
        isGoingRight = false;
        // console.log('isGoingLeft : ', isGoingLeft)
        clearInterval(rightTimerId)
        if(!isGoingLeft){
            leftTimerId = setInterval(()=>{
                isGoingLeft = true;
                
                stepsToRight.current -= 2;
                padRef.current.style.left = stepsToRight.current + 'px'
                // console.log(padRef.current.style.left)
                if( parseInt(padRef.current.style.left,10) <=0){
                    stopPad()
                }
            
            },10)
        }
    }




    // ------------RENDER  -----------------//
    return <>
            <Score score={score}/>
            
            {/* <Route path = */}
        <div>
            { isGameOver ?<Player 
            onSubmit={addPlayer} 
            deletePlayer={deletePlayer} 
            setScore={setScore} 
            score={score} 
            setGameOver={setGameOver} 
            players={players} 
            fetchPlayers={fetchPlayers}/> : null}
        </div>
        <div>
            <InvadersContainer 
            alienSpeed={alienSpeed}
            setAlienSpeed={setAlienSpeed}
            padRef={padRef} 
            invaders={invaders} 
            setInvaders={setInvaders}
            isGameOver={isGameOver}
            setGameOver={setGameOver}
            />
        </div>
        <div id='pad'>
            <LaserContainer 
            padRef={padRef} 
            setScore={setScore} 
            score={score} 
            invaders={invaders} 
            setLasers={setLasers} 
            lasersOnScreen={lasersOnScreen} 
             />
        </div>
        <div id='pad'>
            <Pad 
            padRef={padRef} 
            onRightClick={MovePadRight} 
            onLeftClick={MovePadLeft} 
            onMouseOver={shoot}/>       
        </div>
        <div className='animatedBackground'>
            <Background/>
        </div>
        </>
}




      

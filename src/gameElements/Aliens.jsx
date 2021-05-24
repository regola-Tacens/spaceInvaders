import React, { Component, useEffect, useRef} from'react'
import {useState} from 'react'

export function InvadersContainer ({ setAlienSpeed, alienSpeed, invaders, isGameOver,setGameOver, setInvaders}){
    const [newSetOfAliens, setAliens] = useState (false)
    // const[isGameOver, setGameOver] = useState(false)
    // const newSetOfAliens = useRef(true)
    const alienRef = useRef()
    let timing
    let count = useRef(0)
    const [direction, setDirection] = useState(true)
    
    const toggleSetOfAliens = function (){
        setAliens(newSetOfAliens => !newSetOfAliens)

    }
    const toggleDirection = function () {
        setDirection(direction => !direction)
      }
    
    


    class aliens extends Component{

        constructor (left, alienType){
            super(left)
            this.bottom = 500
            this.left = left
            this.visual = document.createElement("div")
            const visual = this.visual
            visual.classList.add(alienType)
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            
            const alienDiv = alienRef.current
            alienDiv.appendChild(visual)            
        }
    }

    const createAliens = function(space,numAliens, alienType){
       
        // clearInterval(timing)
            setInvaders(()=> invaders=[])
            let startPosition = 300 - (((numAliens*15) + (space*(numAliens-1))))/2
        for (let i=0; i<numAliens;i++){
            
            let position = startPosition + i*(15+space)
            let newInvader = new aliens(position, alienType)
            setInvaders(invaders => [...invaders, newInvader])            
        }
    }

    useEffect(()=>{
        if (!isGameOver){
            createAliens(40,7,'alien') 
            // createAliens(50,3,'alien')
        }
        setAlienSpeed(speed=> speed -1)

    },[newSetOfAliens])


    const moveAliens =  function(){
        count.current++
        if (count.current > 20){
            toggleDirection()
            count.current = 0
        }
        if(invaders.length === 0){
            toggleSetOfAliens()
        }
        invaders.forEach(invader => {
            let visual = invader.visual.style
            invader.bottom -= 1
            direction ? invader.left -= 1 : invader.left += 1
            visual.bottom = invader.bottom + 'px'
            visual.left = invader.left + 'px'

            if(invader.bottom <30){
                invader.visual.classList.remove('alien')
                invaders.splice(invaders.indexOf(invader),1)
                if(invaders.length === 0){
                    setGameOver(true)
                    setAlienSpeed(()=>25)
                }
            }
        });
    }

    useEffect(()=>{
        if (!isGameOver){timing = setInterval(moveAliens, alienSpeed);}        
        return () => clearInterval(timing);
    },[createAliens])


    return <div ref={alienRef}>
        {isGameOver && <h1 className='gameTitle gameOver '>GAME OVER !!!</h1> }
        {/* <button  onClick={createAliens}>c</button> */}
    </div>
}
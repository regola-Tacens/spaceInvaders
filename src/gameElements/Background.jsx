import React, { useRef, Component, useEffect, useState } from 'react'

export function Background (){
    const starRef = useRef()
    const [starsOnScreen, setStar] = useState([])
    const [togglerCreateStars, setToggleCreateStars] = useState(false)
    const timing = useRef()
    // let timing
    class Stars extends Component{

        constructor (left){
            super(left)
            this.bottom = -10
            this.left = Math.floor(Math.random()*600)
            this.visual = document.createElement("div")
            const visual = this.visual
            visual.classList.add('star')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom +  'px'
            
            const starDiv = starRef.current
            starDiv.appendChild(visual)            
        }

    }

    const createStars = function(numStars){
        for (let i=0; i<numStars;i++){            
            let newStar = new Stars()
            setStar(starsOnScreen => [...starsOnScreen, newStar])       
        }
    }

    const toggleSetOfStars = function (){
        // console.log('togglerCreateStars', togglerCreateStars)
        setToggleCreateStars(togglerCreateStars => !togglerCreateStars)
    }

    useEffect(()=>{
        // console.log('ok cerate stars')
        createStars(1)
    },[togglerCreateStars])

    useEffect(()=>{
        let createAlienTimer = setInterval(toggleSetOfStars,120)
        return () => clearInterval(createAlienTimer);
    },[])



    const moveStars = function(){

        starsOnScreen.forEach(star => {
            
            let visual = star.visual.style      
            star.bottom -= 2
            visual.bottom = star.bottom + 'px'
            if(star.bottom <-600){
                star.visual.classList.remove('star')
                starsOnScreen.splice(starsOnScreen.indexOf(star),1)
            }
        });
    }

    useEffect(()=>{
    
        timing.current = setInterval(moveStars, 10)
        
        return () => clearInterval(timing.current);
    },[createStars])

    return <div ref={starRef} ></div>
}
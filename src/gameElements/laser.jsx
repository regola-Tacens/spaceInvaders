import React , {useRef, useEffect, Component} from 'react'


export function LaserContainer ({padRef, setLasers, score, setScore, lasersOnScreen,invaders }){
    const laserRef = useRef(null)
  
    useEffect(()=>{
        let timing = setInterval(moveLasers, 10);
        
        return () => clearInterval(timing);
    },[lasersOnScreen])

    const shootControl = function (e){
        // console.log('yeah')
        // console.log(e)
        if ( e.code ==='Space'){
            console.log('spaceBar')
            handleCreateLaser()
        } 
    }

    useEffect(()=>{
        // console.log('add event listener shooting')
        //add event listener
        window.addEventListener('keyup', shootControl)
        

        //remove on cleanUp
        return ()=>{
            // console.log('removed')
             window.removeEventListener('keyup', shootControl)
        }
    })

   

 

    class Laser extends Component {
        constructor (padPosition){
            super(padPosition)
            // console.log(padPosition)
            this.bottom = 90
            this.left = parseInt(padPosition,10) +30
            this.visual = document.createElement("div")
            const visual = this.visual
            visual.classList.add('laser')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            const targetedDiv = laserRef.current
            targetedDiv.appendChild(visual)
        }
    }

     
    const moveLasers = function (){  
        
        lasersOnScreen.forEach(laser => {
            
          
            let visual = laser.visual.style
            laser.bottom += 3
            visual.bottom = laser.bottom + 'px'
            // console.log(laser)
            // console.log(invaders)
            invaders.forEach(invader => {
                // console.log(invaders.indexOf(invader))
                let invIndex = invaders.indexOf(invader)
                let lasIndex = lasersOnScreen.indexOf(laser)
                let invLeft = invader.left
                let invBot = invader.bottom
                let lasLeft = laser.left
                let lasBot = laser.bottom
                
                if((lasLeft > invLeft -1 && lasLeft < invLeft +30)&&
                   ( lasBot > invBot -5 && lasBot < invBot +20)
                    )
                    {
                        invader.visual.classList.remove('alien')
                        invaders.splice(invIndex,1)
                        laser.visual.classList.remove('laser')
                        lasersOnScreen.splice(lasIndex,1)
                        setScore(score => score + 1)
                    }
            });

            if(laser.bottom > 593){
                lasersOnScreen[0].visual.classList.remove('laser')
                lasersOnScreen.splice(0,1)
            }
        })
    }

 
  


    const handleCreateLaser = function (){
        // console.log('lasersOnScree : ',lasersOnScreen)
        let newLaser = new Laser(padRef.current.style.left)
        setLasers(lasersOnScreen =>[...lasersOnScreen, newLaser])
        
        // lasersOnScreen[0].hello()
        
    }
   
    
    return <>
        {/* <button className='btn btn-outline-success btn-sm'  id='shootButton'
                onClick={handleCreateLaser}>
                    shoot
        </button> */}
    <div ref={laserRef}> </div>
    </>
}



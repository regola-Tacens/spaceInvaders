import React, { useEffect } from 'react'
import {useState} from 'react'


export function Player({onSubmit, score, deletePlayer, setScore, setGameOver, players, fetchPlayers}) {

    const [isNameSubmited, setIsNameSubmited] = useState(false)

    const handleSubmit = async function(e){
        e.preventDefault()
        const form = e.target 
        const data = Object.fromEntries(new FormData(form))
        data.score = score

        // find worst 
        // if (players) {
        //     let lowestScore = players[0].score
        //     let worstPlayer = players[0]  
        //         for (let i=1; i < players.length;i++){
        //             if(players[i].score < lowestScore){
        //             worstPlayer = players[i]
        //             lowestScore = players[i].score
        //         }
        //     }
        // } 


        const insertScore = async function (){
            try { 
                await onSubmit(data)
                fetchPlayers();
                let timer = setInterval(()=> {
                    setIsNameSubmited(()=> true)
                    clearInterval(timer)
                },100)               
            } catch (error) {
                throw error
            } 
        }

        insertScore()

        // if(players.length >3){


        //     if(data.score < lowestScore){
        //         setIsNameSubmited(()=> true)
        //     } else {
        //         deletePlayer(worstPlayer)
        //         insertScore()
        //     }
        //     // data.score < lowestScore ? setIsNameSubmited(()=> true) : insertScore()
        
        // } else if (players.length <=3)insertScore()
    }

    const handleClick = ()=>{
        setScore(()=> 0)
        setGameOver(()=> false)
    }
 
    return <>
    {!isNameSubmited ? 
    <form className='player' onSubmit ={handleSubmit}>
        <label className='name' htmlFor='player'>ENTER YOUR NAME  :</label><br/>
        <input type = 'text' className='playerInput' name ='name'/><br/>
        <button className='sendButton mt-2' htmltype = 'submit'> SEND</button>
    </form> : 
    <div >        
        <HallOfFame players={players} handleClick={handleClick}/>       
    </div>
    }
    </>
}

const HallOfFame = function({players, handleClick}){

    return <>
        <div class="table">
            <h2>hall of fame</h2>
            <ul>
                {players.map( player =>
                    <li>
                        <span>{player.name}</span><span className='scored'>{player.score}</span>
                    </li>              
                )} 
            </ul>
            <button
            className='btn btn-outline-danger btn-sm mt-2' 
            onClick={handleClick}>PLAY AGAIN
            </button>
        </div>

    {/* <div className='hallOfFame'>
   
        <table>
            <thead>
                <tr>
                    <th colSpan ='3'>HALL OF FAME</th>
                </tr>
            </thead>
            <tbody>
                {players.map( player => 
                <tr>
                    <td>{player.name}</td>.....<td>{player.score} KILLS</td>
                </tr>)
                }   
            </tbody>
        </table> 
        <div>               
             <button
            className='btn btn-outline-danger btn-sm mt-2' 
            onClick={handleClick}>PLAY AGAIN
            </button>              
        </div>
    </div> */}
        
    </>
 }


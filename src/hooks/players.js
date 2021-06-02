import React, { useReducer } from 'react'
import { apiFetch } from '../utils/apiFetch'

function reducer (state, action){
    // console.log('CARS REDUCER', action.type, action)
    switch(action.type){
        case 'FETCHING_PLAYERS' :
            return {...state}

        case 'SET_PLAYERS' : 
            return {...state, players : action.payload }

        case 'ADD_PLAYER':
            return {...state, players: action.payload}
        
        case 'DELETE_PLAYER' :
            return {...state, players : state.players.filter(player => (player !== action.payload)) }
    }
}
// cars : state.cars.filter(c => (c !== action.payload))}



export function usePlayer(){
    const[state, dispatch] = useReducer(reducer, {
        players : null,
        
    })

    return {
        
        players : state.players,
        // score : state.score,
        
        addPlayer : async function(data){
            // console.log('player dans le hook', data)
            const player = await apiFetch('/players', {
                method : 'post',
                body : data
            })
            // console.log('state.name', state.players)
            // console.log('state : ', state)
            dispatch({type : 'ADD_PLAYER', payload : player})

        
        },
        fetchPlayers : async function (){
                // const players = await apiFetch('/players')
                const players = await apiFetch('/players')
                console.log( 'players', players)
                dispatch({type : 'FETCHING_PLAYERS'})
                // const players = await apiFetch('/players')
                dispatch({type : 'SET_PLAYERS', payload : players})

            
        },
        deletePlayer : async function(worstPlayer){
            await apiFetch('/players/' + worstPlayer._id,{
                method : 'DELETE'
            })
            dispatch({type : 'DELETE_PLAYER', payload : worstPlayer}) 

        }
    }

}

// dispatch({type : 'FETCHING_CARS'})
// const cars = await apiFetch('/cars')
// dispatch({type : 'SET_CARS', payload : cars})

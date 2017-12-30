import React from 'react'
import ReactDOM from 'react-dom'
import reduce from './reducer'

it('adds a player', () => {
  const action = {type: 'ADD_PLAYER', player: 'Steve', target: 31}
  const newState = reduce(undefined, action)

  expect(newState).toEqual({
    players: [{name: 'Steve', target: 31, history: [], score: 0}],
  })
})

it('does a bunch of stuff', () => {
  const actions = [
    {type: 'ADD_PLAYER', player: 'Steve', target: 31},
    {type: 'ADD_PLAYER', player: 'Craig', target: 31},
    {type: 'ADD_PLAYER', player: 'Sandy', target: 31},
    {type: 'ADD_PLAYER', player: 'ASSHOLE', target: 31},
    {type: 'DELETE_PLAYER', player: 'ASSHOLE'},
    {type: 'SHUFFLE_PLAYERS'},
    {type: 'SCORE', player: 'Steve', reason: 'CANNON'},
    {type: 'SCORE', player: 'Craig', reason: 'CANNON'},
    {type: 'SCORE', player: 'Sandy', reason: 'CANNON'},
    {type: 'SCORE', player: 'Steve', reason: 'YELLOW'},
    {type: 'SCORE', player: 'Steve', reason: 'GREEN'},
    {type: 'SCORE', player: 'Steve', reason: 'BLUE'},
    {type: 'SCORE', player: 'Steve', reason: 'PINK'},
    {type: 'SCORE', player: 'Steve', reason: 'BLACK'},
    {type: 'RESET_SCORE', player: 'Steve', reason: 'FOUL'},
    {type: 'RESET_SCORE', player: 'Steve', reason: 'POO'},
    {type: 'DECLARE_WINNER', player: 'Steve'},
  ]

  expect(actions.reduce(reduce, undefined)).toEqual({
    players: [
      {
        name: 'Steve',
        target: 41,
        history: [
          'CANNON',
          'YELLOW',
          'GREEN',
          'BLUE',
          'PINK',
          'BLACK',
          'FOUL',
          'POO',
          'WIN',
          'GAME_OVER',
        ],
        score: 0,
      },
      {
        name: 'Craig',
        target: 31,
        history: ['CANNON', 'GAME_OVER'],
        score: 0,
      },
      {
        name: 'Sandy',
        target: 31,
        history: ['CANNON', 'GAME_OVER'],
        score: 0,
      },
    ],
  })
})

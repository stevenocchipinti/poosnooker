import React from 'react'
import ReactDOM from 'react-dom'
import reduce from './reducer'

describe('adding a player', () => {
  it('adds a player if a valid player name and target is provided', () => {
    const action = {type: 'ADD_PLAYER', player: 'Steve', target: 31}
    const newState = reduce(undefined, action)
    expect(newState.players).toEqual([
      {name: 'Steve', target: 31, history: [], score: 0},
    ])
  })

  it("doesn't add a player if a name isn't provided", () => {
    const action = {type: 'ADD_PLAYER', target: 31}
    const newState = reduce(undefined, action)
    expect(newState.players).toEqual([])
  })

  it("doesn't add a player if a name is blank", () => {
    const action = {type: 'ADD_PLAYER', player: '', target: 31}
    const newState = reduce(undefined, action)
    expect(newState.players).toEqual([])
  })

  it("doesn't add a player if a target isn't provided", () => {
    const action = {type: 'ADD_PLAYER', player: ''}
    const newState = reduce(undefined, action)
    expect(newState.players).toEqual([])
  })

  it("doesn't add a player if a target is below 31", () => {
    const action = {type: 'ADD_PLAYER', player: '', target: 30}
    const newState = reduce(undefined, action)
    expect(newState.players).toEqual([])
  })

  it("doesn't add a player if a target is not an increment of 10 + 1", () => {
    const action = {type: 'ADD_PLAYER', player: '', target: 40}
    const newState = reduce(undefined, action)
    expect(newState.players).toEqual([])
  })
})

it('calculates the score for players', () => {
  const actions = [
    {type: 'ADD_PLAYER', player: 'Steve', target: 31},
    {type: 'ADD_PLAYER', player: 'Craig', target: 31},
    {type: 'SCORE', player: 'Steve', reason: 'CANNON'},
    {type: 'SCORE', player: 'Craig', reason: 'CANNON'},
    {type: 'SCORE', player: 'Steve', reason: 'YELLOW'},
    {type: 'SCORE', player: 'Steve', reason: 'GREEN'},
    {type: 'RESET_SCORE', player: 'Steve', reason: 'FOUL'},
    {type: 'SCORE', player: 'Steve', reason: 'CANNON'},
    {type: 'SCORE', player: 'Steve', reason: 'BLUE'},
    {type: 'SCORE', player: 'Steve', reason: 'PINK'},
    {type: 'SCORE', player: 'Steve', reason: 'BLACK'},
    {type: 'RESET_SCORE', player: 'Craig', reason: 'FOUL'},
  ]

  const newState = actions.reduce(reduce, undefined)
  expect(newState.players).toEqual([
    {
      name: 'Steve',
      target: 31,
      history: [
        'CANNON', // 2
        'YELLOW', // 2
        'GREEN', // 3
        'FOUL', // 0
        'CANNON', // 2
        'BLUE', // 7
        'PINK', // 13
        'BLACK', // 20
      ],
      score: 20,
    },
    {
      name: 'Craig',
      target: 31,
      history: ['CANNON', 'FOUL'],
      score: 0,
    },
  ])
})

// Being lazy, should probably write single purpose unit tests :/
it('does a bunch of stuff', () => {
  const actions = [
    {type: 'ADD_PLAYER', player: 'Steve', target: 31}, // currentPlayerIndex: 0
    {type: 'ADD_PLAYER', player: 'Craig', target: 31}, // currentPlayerIndex: 0
    {type: 'ADD_PLAYER', player: 'Sandy', target: 31}, // currentPlayerIndex: 0
    {type: 'ADD_PLAYER', player: 'ASSHOLE', target: 31}, // currentPlayerIndex: 0
    {type: 'DELETE_PLAYER', player: 'ASSHOLE'},
    {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
    {type: 'NEXT_PLAYER'}, // currentPlayerIndex: 1
    {type: 'SCORE', player: 'Craig', reason: 'CANNON'}, // 2
    {type: 'NEXT_PLAYER'}, // currentPlayerIndex: 2
    {type: 'SCORE', player: 'Sandy', reason: 'CANNON'}, // 2
    {type: 'NEXT_PLAYER'}, // currentPlayerIndex: 0
    {type: 'SCORE', player: 'Steve', reason: 'YELLOW'}, // 4
    {type: 'SCORE', player: 'Steve', reason: 'GREEN'}, // 7
    {type: 'SCORE', player: 'Steve', reason: 'BLUE'}, // 12
    {type: 'RESET_SCORE', player: 'Steve', reason: 'FOUL'}, // 0
    {type: 'RESET_SCORE', player: 'Steve', reason: 'POO'}, // 0
    {type: 'SCORE', player: 'Steve', reason: 'PINK'}, // 6
    {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 13
    {type: 'PREVIOUS_PLAYER'}, // currentPlayerIndex: 2
    {type: 'PREVIOUS_PLAYER'}, // currentPlayerIndex: 1
    {type: 'DECLARE_WINNER', player: 'Steve'},
  ]

  expect(actions.reduce(reduce, undefined)).toEqual({
    currentPlayerIndex: 1,
    players: [
      {
        name: 'Steve',
        target: 41,
        history: [
          'CANNON',
          'YELLOW',
          'GREEN',
          'BLUE',
          'FOUL',
          'POO',
          'PINK',
          'BLACK',
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

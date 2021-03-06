import React from 'react'
import ReactDOM from 'react-dom'
import reduce from '.'

describe('adding a player', () => {
  it('adds a player if a valid player name and target is provided', () => {
    const actions = [
      {type: 'ADD_PLAYER', player: 'Steve', target: 31},
      {type: 'ADD_PLAYER', player: 'Craig', target: 41},
    ]
    const newState = actions.reduce(reduce, undefined)
    expect(newState.players).toEqual([
      {
        name: 'Steve',
        target: 31,
        history: [],
        cumulativeScore: [0],
        score: 0,
        wins: 0,
      },
      {
        name: 'Craig',
        target: 41,
        history: [],
        cumulativeScore: [0],
        score: 0,
        wins: 0,
      },
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
    const action = {type: 'ADD_PLAYER', player: '', target: 21}
    const newState = reduce(undefined, action)
    expect(newState.players).toEqual([])
  })

  it("doesn't add a player if a target is not an increment of 10 + 1", () => {
    const action = {type: 'ADD_PLAYER', player: '', target: 40}
    const newState = reduce(undefined, action)
    expect(newState.players).toEqual([])
  })
})

describe('adding score to a player', () => {
  describe('when a player DOES NOT have the required opening CANNON', () => {
    const actions = [
      {type: 'ADD_PLAYER', player: 'Steve', target: 31},
      {type: 'SCORE', player: 'Steve', reason: 'YELLOW'}, // 4
    ]

    it('does not add any scores', () => {
      const newState = actions.reduce(reduce, undefined)
      expect(newState.players[0].score).toEqual(0)
    })

    it('does not add anything to the history', () => {
      const newState = actions.reduce(reduce, undefined)
      expect(newState.players[0].history).toHaveLength(0)
    })

    it('does not add anything to the cumulativeScore', () => {
      const newState = actions.reduce(reduce, undefined)
      expect(newState.players[0].cumulativeScore).toEqual([0])
    })

    it('still does add any score resets to the cumulativeScore', () => {
      const newState = [
        ...actions,
        {type: 'RESET_SCORE', player: 'Steve', reason: 'POO'},
      ].reduce(reduce, undefined)
      expect(newState.players[0].cumulativeScore).toEqual([0, 0])
    })

    it('still does add any score resets to the history', () => {
      const newState = [
        ...actions,
        {type: 'RESET_SCORE', player: 'Steve', reason: 'POO'},
      ].reduce(reduce, undefined)
      expect(newState.players[0].history).toEqual(['POO'])
    })
  })

  describe('when a player DOES have the required opening CANNON', () => {
    const actions = [
      {type: 'ADD_PLAYER', player: 'Steve', target: 31},
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
      {type: 'RESET_SCORE', player: 'Steve', reason: 'POO'}, // 0
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
      {type: 'RESET_SCORE', player: 'Steve', reason: 'FOUL'}, // 0
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
      {type: 'SCORE', player: 'Steve', reason: 'YELLOW'}, // 4
      {type: 'SCORE', player: 'Steve', reason: 'GREEN'}, // 7
      {type: 'SCORE', player: 'Steve', reason: 'BLUE'}, // 12
      {type: 'SCORE', player: 'Steve', reason: 'PINK'}, //18
      {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 25
    ]
    const newState = actions.reduce(reduce, undefined)
    const player = newState.players[0]

    it('does add points to the score', () => {
      expect(player.score).toEqual(25)
    })

    it('does add an item to the history', () => {
      expect(player.history).toEqual([
        'CANNON',
        'POO',
        'CANNON',
        'FOUL',
        'CANNON',
        'YELLOW',
        'GREEN',
        'BLUE',
        'PINK',
        'BLACK',
      ])
    })

    it('does add an item to the cumulativeScore', () => {
      expect(player.cumulativeScore).toEqual([
        0,
        2,
        0,
        2,
        0,
        2,
        4,
        7,
        12,
        18,
        25,
      ])
    })

    describe('when the score reaches (target - 1) points', () => {
      const actions = [
        {type: 'ADD_PLAYER', player: 'Steve', target: 31},
        {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
        {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 9
        {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 16
        {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 23
        {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 30
      ]
      const newState = actions.reduce(reduce, undefined)
      const player = newState.players[0]

      it('resets the score', () => {
        expect(player.score).toEqual(0)
      })

      it('resets the cumulativeScore', () => {
        expect(player.cumulativeScore).toEqual([0, 2, 9, 16, 23, 30, 0])
      })

      it('adds "OVER" to the history', () => {
        expect(player.history).toEqual([
          'CANNON',
          'BLACK',
          'BLACK',
          'BLACK',
          'BLACK',
          'OVER',
        ])
      })
    })

    describe('when the score goes over the target points', () => {
      const actions = [
        {type: 'ADD_PLAYER', player: 'Steve', target: 31},
        {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
        {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 9
        {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 16
        {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 23
        {type: 'SCORE', player: 'Steve', reason: 'PINK'}, // 29
        {type: 'SCORE', player: 'Steve', reason: 'GREEN'}, // 32
      ]
      const newState = actions.reduce(reduce, undefined)
      const player = newState.players[0]

      it('resets the score', () => {
        expect(player.score).toEqual(0)
      })

      it('resets the cumulativeScore', () => {
        expect(player.cumulativeScore).toEqual([0, 2, 9, 16, 23, 29, 32, 0])
      })

      it('adds "OVER" to the history', () => {
        expect(player.history).toEqual([
          'CANNON',
          'BLACK',
          'BLACK',
          'BLACK',
          'PINK',
          'GREEN',
          'OVER',
        ])
      })
    })
  })
})

describe('winning', () => {
  describe('allows a win if the score is equal to the target', () => {
    const actions = [
      {type: 'ADD_PLAYER', player: 'Steve', target: 31},
      {type: 'ADD_PLAYER', player: 'Craig', target: 31},
      {type: 'ADD_PLAYER', player: 'Some', target: 31},
      {type: 'ADD_PLAYER', player: 'Random', target: 31},
      {type: 'ADD_PLAYER', player: 'Player', target: 31},
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
      {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 9
      {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 16
      {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 23
      {type: 'SCORE', player: 'Steve', reason: 'PINK'}, // 29
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 31
      {type: 'DECLARE_WINNER', player: 'Steve'},
    ]
    const newState = actions.reduce(reduce, undefined)
    const steve = newState.players.find(p => p.name === 'Steve')
    const craig = newState.players.find(p => p.name === 'Craig')

    it('increments the target score by 10', () => {
      expect(steve.target).toEqual(41)
    })
    it('increments the wins count by 1', () => {
      expect(steve.wins).toEqual(1)
    })
    it('clears the history array for all players', () => {
      expect(steve.history).toEqual([])
      expect(craig.history).toEqual([])
    })
    it('clears the cumulativeScore score array for all players', () => {
      expect(steve.cumulativeScore).toEqual([0])
      expect(craig.cumulativeScore).toEqual([0])
    })
    it('resets the score', () => {
      expect(steve.score).toEqual(0)
      expect(craig.score).toEqual(0)
    })
  })

  it('does not automatically win when reaching a target score', () => {
    const actions = [
      {type: 'ADD_PLAYER', player: 'Steve', target: 31},
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
      {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 9
      {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 16
      {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 23
      {type: 'SCORE', player: 'Steve', reason: 'PINK'}, // 29
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 31
    ]
    const newState = actions.reduce(reduce, undefined)
    const player = newState.players[0]

    expect(player.score).toEqual(31)
    expect(player.cumulativeScore.slice(-1)).toEqual([31])
    expect(player.target).toEqual(31)
    expect(player.history).toHaveLength(6)
    expect(player.cumulativeScore).toHaveLength(7)
    expect(player.history).not.toContain('WIN')
    expect(player.history).not.toContain('GAME_OVER')
  })

  it('does not allow a win if score is not equal to the target', () => {
    const actions = [
      {type: 'ADD_PLAYER', player: 'Steve', target: 31},
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
      {type: 'DECLARE_WINNER', player: 'Steve'}, // 2
    ]
    const newState = actions.reduce(reduce, undefined)
    const player = newState.players[0]

    expect(player.score).toEqual(2)
    expect(player.cumulativeScore.slice(-1)).toEqual([2])
    expect(player.target).toEqual(31)
    expect(player.history).toHaveLength(1)
    expect(player.cumulativeScore).toHaveLength(2)
    expect(player.history).not.toContain('WIN')
    expect(player.history).not.toContain('GAME_OVER')
  })
})

describe('undo', () => {
  describe('when the last history item was a "SCORE" event', () => {
    const actions = [
      {type: 'ADD_PLAYER', player: 'Steve', target: 31},
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
      {type: 'SCORE', player: 'Steve', reason: 'BLUE'}, // 7
      {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 14
      {type: 'UNDO', player: 'Steve'}, // 7
    ]
    const newState = actions.reduce(reduce, undefined)
    const player = newState.players[0]

    it('removes the last "SCORE" event from the history', () => {
      expect(player.history).toEqual(['CANNON', 'BLUE'])
    })

    it('removes the last "SCORE" from the cumulativeScore', () => {
      expect(player.cumulativeScore).toEqual([0, 2, 7])
    })

    it('excludes the last "SCORE" event from the score calculation', () => {
      expect(player.score).toEqual(7)
    })
  })

  describe('when the last history item was a "RESET" event', () => {
    const actions = [
      {type: 'ADD_PLAYER', player: 'Steve', target: 31},
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
      {type: 'SCORE', player: 'Steve', reason: 'BLUE'}, // 7
      {type: 'SCORE', player: 'Steve', reason: 'POO'}, // 0
      {type: 'UNDO', player: 'Steve'}, // 7
    ]
    const newState = actions.reduce(reduce, undefined)
    const player = newState.players[0]

    it('removes the last "RESET" event from the history', () => {
      expect(player.history).toEqual(['CANNON', 'BLUE'])
    })

    it('removes the last "RESET" from the cumulativeScore', () => {
      expect(player.cumulativeScore).toEqual([0, 2, 7])
    })

    it('excludes the last "RESET" event from the score calculation', () => {
      expect(player.score).toEqual(7)
    })
  })
})

describe('selecting a player', () => {
  const actions = [
    {type: 'ADD_PLAYER', player: 'Steve', target: 31},
    {type: 'ADD_PLAYER', player: 'Craig', target: 31},
    {type: 'ADD_PLAYER', player: 'Sandy', target: 31},
  ]

  describe('when the selected player exists', () => {
    const newState = [
      ...actions,
      {type: 'SELECT_PLAYER', player: 'Sandy'},
    ].reduce(reduce, undefined)
    it('sets the currentPlayerIndex to the index of the selected player', () => {
      expect(newState.currentPlayerIndex).toEqual(2)
    })
  })

  describe('when the selected player exists', () => {
    const newState = [
      ...actions,
      {type: 'SELECT_PLAYER', player: 'Nobody'},
    ].reduce(reduce, undefined)
    it("doesn't change the currentPlayerIndex", () => {
      expect(newState.currentPlayerIndex).toEqual(0)
    })
  })
})

describe('shuffling players', () => {
  const actions = [
    {type: 'ADD_PLAYER', player: 'One', target: 31},
    {type: 'ADD_PLAYER', player: 'Two', target: 31},
    {type: 'ADD_PLAYER', player: 'Three', target: 31},
    {type: 'ADD_PLAYER', player: 'Four', target: 31},
    {type: 'ADD_PLAYER', player: 'Five', target: 31},
    {type: 'NEXT_PLAYER'},
  ]
  const action = {type: 'SHUFFLE_PLAYERS', seed: 1}
  const oldState = actions.reduce(reduce, undefined)

  it('deterministically reorders the players array', () => {
    const newOrderOfNames = ['Three', 'Two', 'One', 'Five', 'Four']

    const firstNewState = reduce(oldState, action)
    expect(firstNewState).not.toEqual(oldState)
    expect(firstNewState.players.map(p => p.name)).toEqual(newOrderOfNames)

    const secondNewState = reduce(oldState, action)
    expect(secondNewState).not.toEqual(oldState)
    expect(secondNewState.players.map(p => p.name)).toEqual(newOrderOfNames)
  })

  it('resets the currentPlayerIndex to 0', () => {
    expect(oldState.currentPlayerIndex).toEqual(1)
    const newState = reduce(oldState, {type: 'SHUFFLE_PLAYERS', seed: 1})
    expect(newState.currentPlayerIndex).toEqual(0)
  })
})

// Being lazy, should probably write single purpose unit tests :/
describe('a typical scenario (aka lazy integration test)', () => {
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
      {type: 'RESET_SCORE', player: 'Steve', reason: 'FOUL'}, // 0
      {type: 'RESET_SCORE', player: 'Steve', reason: 'POO'}, // 0
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 2
      {type: 'SCORE', player: 'Steve', reason: 'CANNON'}, // 4
      {type: 'SCORE', player: 'Steve', reason: 'GREEN'}, // 7
      {type: 'SCORE', player: 'Steve', reason: 'BLUE'}, // 12
      {type: 'SCORE', player: 'Steve', reason: 'PINK'}, // 18
      {type: 'SCORE', player: 'Steve', reason: 'BLACK'}, // 25
      {type: 'SCORE', player: 'Steve', reason: 'PINK'}, // 31
      {type: 'PREVIOUS_PLAYER'}, // currentPlayerIndex: 2
      {type: 'PREVIOUS_PLAYER'}, // currentPlayerIndex: 1
    ]

    expect(actions.reduce(reduce, undefined)).toEqual({
      currentPlayerIndex: 1,
      players: [
        {
          name: 'Steve',
          target: 31,
          history: [
            'CANNON', // 2
            'YELLOW', // 4
            'FOUL', // 0
            'POO', // 0
            'CANNON', // 2
            'CANNON', // 4
            'GREEN', // 7
            'BLUE', // 12
            'PINK', // 18
            'BLACK', // 25
            'PINK', // 31
          ],
          cumulativeScore: [0, 2, 4, 0, 0, 2, 4, 7, 12, 18, 25, 31],
          score: 31,
          wins: 0,
        },
        {
          name: 'Craig',
          target: 31,
          history: ['CANNON'],
          cumulativeScore: [0, 2],
          score: 2,
          wins: 0,
        },
        {
          name: 'Sandy',
          target: 31,
          history: ['CANNON'],
          cumulativeScore: [0, 2],
          score: 2,
          wins: 0,
        },
      ],
    })
  })
})

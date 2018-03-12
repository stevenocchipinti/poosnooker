const resetValues = ['FOUL', 'POO', 'OVER', 'GAME_OVER']
const scoreValues = {
  CANNON: 2,
  YELLOW: 2,
  GREEN: 3,
  BLUE: 5,
  PINK: 6,
  BLACK: 7,
}

// ref: https://github.com/yixizhang/seed-shuffle/blob/master/index.js
const shuffle = (originalArray, seed) => {
  let array = [...originalArray]
  let currentIndex = array.length,
    temporaryValue,
    randomIndex
  seed = seed || 1
  let random = function() {
    var x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(random() * currentIndex)
    currentIndex -= 1
    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

const calculateScore = history =>
  history.reduce((score, value) => {
    if (resetValues.includes(value)) return 0
    if (scoreValues[value]) return score + scoreValues[value]
    return score
  }, 0)

const newStateWithUpdatedPlayer = (state, playerName, changes) => {
  const playerIndex = state.players.findIndex(p => p.name === playerName)
  const player = {...state.players[playerIndex], ...changes}
  return {
    ...state,
    players: [
      ...state.players.slice(0, playerIndex),
      {
        ...player,
        score: calculateScore(player.history),
      },
      ...state.players.slice(playerIndex + 1),
    ],
  }
}

const extractPlayerFromState = (state, playerName) =>
  state.players[state.players.findIndex(p => p.name === playerName)]

////////////////////////////////////////////////////////////////////////////////

const addPlayer = (state, playerName, target) => {
  const hasValidName = playerName && playerName.trim().length
  const hasValidTarget = target >= 31 && (target - 1) % 10 === 0
  if (!hasValidName || !hasValidTarget) return state

  return {
    ...state,
    currentPlayerIndex: state.currentPlayerIndex || 0,
    players: [
      ...state.players,
      {name: playerName, target, history: [], score: 0},
    ],
  }
}

const deletePlayer = (state, playerName) => {
  const playerIndex = state.players.findIndex(p => p.name === playerName)
  return {
    ...state,
    players: [
      ...state.players.slice(0, playerIndex),
      ...state.players.slice(playerIndex + 1),
    ],
  }
}

const nextPlayer = state => {
  let nextPlayerIndex = state.currentPlayerIndex + 1
  if (nextPlayerIndex >= state.players.length) nextPlayerIndex = 0
  return {
    ...state,
    currentPlayerIndex: nextPlayerIndex,
  }
}

const previousPlayer = state => {
  let previousPlayerIndex = state.currentPlayerIndex - 1
  if (previousPlayerIndex < 0) previousPlayerIndex = state.players.length - 1
  return {
    ...state,
    currentPlayerIndex: previousPlayerIndex,
  }
}

const selectPlayer = (state, playerName) => {
  const index = state.players.findIndex(n => n.name === playerName)
  return index === -1 ? state : {...state, currentPlayerIndex: index}
}

const shufflePlayers = (state, seed) => {
  return {
    ...state,
    currentPlayerIndex: 0,
    players: shuffle(state.players, seed),
  }
}

// Note: Winning is not automatic to allow for 'undo'
const addScoreToPlayer = (state, playerName, reason) => {
  const player = extractPlayerFromState(state, playerName)

  // Rule: Cannot score unless you cannon off the pink
  if (player.score === 0 && reason !== 'CANNON') return state

  const newState = newStateWithUpdatedPlayer(state, playerName, {
    history: [...player.history, reason],
  })
  const newScore = extractPlayerFromState(newState, playerName).score

  const isOver = newScore === player.target - 1 || newScore > player.target
  return isOver ? resetPlayerScore(newState, playerName, 'OVER') : newState
}

const resetPlayerScore = (state, playerName, reason) => {
  const player = extractPlayerFromState(state, playerName)
  return newStateWithUpdatedPlayer(state, playerName, {
    history: [...player.history, reason],
  })
}

const undoPlayerScore = (state, playerName) => {
  const player = extractPlayerFromState(state, playerName)
  return newStateWithUpdatedPlayer(state, playerName, {
    history: player.history.slice(0, player.history.length - 1),
  })
}

const declareWinner = (state, playerName) => {
  const player = extractPlayerFromState(state, playerName)
  if (player.score !== player.target) return state

  const newState = newStateWithUpdatedPlayer(state, playerName, {
    target: player.target + 10,
    history: [...player.history, 'WIN'],
  })
  return endGame(newState)
}

const endGame = state => {
  const newState = {
    ...state,
    players: state.players.map(player => {
      const newHistory = [...player.history, 'GAME_OVER']
      const newScore = calculateScore(newHistory)
      return {
        ...player,
        score: newScore,
        history: newHistory,
      }
    }),
  }
  return shufflePlayers(newState)
}

const initialState = {
  players: [],
}

export default (state = initialState, action) => {
  if (!action) return state
  switch (action.type) {
    case 'ADD_PLAYER':
      return addPlayer(state, action.player, action.target)
    case 'DELETE_PLAYER':
      return deletePlayer(state, action.player)

    case 'NEXT_PLAYER':
      return nextPlayer(state)
    case 'PREVIOUS_PLAYER':
      return previousPlayer(state)
    case 'SELECT_PLAYER':
      return selectPlayer(state, action.player)

    case 'SHUFFLE_PLAYERS':
      return shufflePlayers(state, action.seed)

    case 'SCORE':
      return addScoreToPlayer(state, action.player, action.reason)
    case 'RESET_SCORE':
      return resetPlayerScore(state, action.player, action.reason)
    case 'UNDO':
      return undoPlayerScore(state, action.player)

    case 'DECLARE_WINNER':
      return declareWinner(state, action.player)
    case 'END_GAME':
      return endGame(state)

    default:
      return state
  }
}

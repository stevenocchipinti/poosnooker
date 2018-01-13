const scoreValues = {
  CANNON: 2,
  YELLOW: 2,
  GREEN: 3,
  BLUE: 5,
  PINK: 6,
  BLACK: 7,
}

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

const addScoreToPlayer = (state, playerName, reason) => {
  const playerIndex = state.players.findIndex(p => p.name === playerName)
  const player = state.players[playerIndex]
  const newScore = player.score + scoreValues[reason]
  const newState = {
    ...state,
    players: [
      ...state.players.slice(0, playerIndex),
      {
        ...player,
        score: newScore,
        history: [...player.history, reason],
      },
      ...state.players.slice(playerIndex + 1),
    ],
  }

  // Winning is not automatic to allow for 'undo'
  const isOver = newScore === player.target - 1 || newScore > player.target
  return isOver ? resetPlayerScore(newState, playerName, 'OVER') : newState
}

const resetPlayerScore = (state, playerName, reason) => {
  const playerIndex = state.players.findIndex(p => p.name === playerName)
  const player = state.players[playerIndex]
  return {
    ...state,
    players: [
      ...state.players.slice(0, playerIndex),
      {
        ...player,
        score: 0,
        history: [...state.players[playerIndex].history, reason],
      },
      ...state.players.slice(playerIndex + 1),
    ],
  }
}

const declareWinner = (state, winner) => {
  const playerIndex = state.players.findIndex(p => p.name === winner)
  const player = state.players[playerIndex]
  if (player.score !== player.target) return state

  const newState = {
    ...state,
    players: [
      ...state.players.slice(0, playerIndex),
      {
        ...player,
        target: player.target + 10,
        history: [...player.history, 'WIN'],
      },
      ...state.players.slice(playerIndex + 1),
    ],
  }
  return endGame(newState)
}

const endGame = state => ({
  ...state,
  players: state.players.map(player => {
    return {
      ...player,
      score: 0,
      history: [...player.history, 'GAME_OVER'],
    }
  }),
})

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

    // TODO: This should probably be a deterministic REORDER action
    // case 'SHUFFLE_PLAYERS':
    //   return shufflePlayers(state)

    case 'SCORE':
      return addScoreToPlayer(state, action.player, action.reason)
    case 'RESET_SCORE':
      return resetPlayerScore(state, action.player, action.reason)

    case 'DECLARE_WINNER':
      return declareWinner(state, action.player)
    case 'END_GAME':
      return endGame(state)

    default:
      return state
  }
}

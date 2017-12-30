const scoreValues = {
  CANNON: 2,
  YELLOW: 2,
  GREEN: 3,
  BLUE: 5,
  PINK: 6,
  BLACK: 7,
}

const addPlayer = (state, playerName, target) => {
  return {
    ...state,
    players: [
      ...state.players,
      {name: playerName, target, history: [], score: 0},
    ],
  }
}

const deletePlayer = (state, playerName) => {
  const i = state.players.findIndex(player => player.name === playerName)
  return {
    ...state,
    players: [...state.players.slice(0, i), ...state.players.slice(i + 1)],
  }
}

const shufflePlayers = state => {
  // TODO
  return state
}

const addScoreToPlayer = (state, playerName, reason) => {
  const i = state.players.findIndex(player => player.name === playerName)
  return {
    ...state,
    players: [
      ...state.players.slice(0, i),
      {
        ...state.players[i],
        score: state.players[i].score + scoreValues[reason],
        history: [...state.players[i].history, reason],
      },
      ...state.players.slice(i + 1),
    ],
  }
}

const resetPlayerScore = (state, playerName, reason) => {
  const i = state.players.findIndex(player => player.name === playerName)
  return {
    ...state,
    players: [
      ...state.players.slice(0, i),
      {
        ...state.players[i],
        score: 0,
        history: [...state.players[i].history, reason],
      },
      ...state.players.slice(i + 1),
    ],
  }
}

const declareWinner = (state, winner) => {
  const i = state.players.findIndex(player => player.name === winner)
  return {
    ...state,
    players: [
      ...state.players.slice(0, i),
      {
        ...state.players[i],
        target: state.players[i].target + 10,
        history: [...state.players[i].history, 'WIN'],
      },
      ...state.players.slice(i + 1),
    ],
  }
}

const endGame = state => {
  return {
    ...state,
    players: state.players.map(p => {
      return {
        ...p,
        score: 0,
        history: [...p.history, 'GAME_OVER'],
      }
    }),
  }
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
    case 'SHUFFLE_PLAYERS':
      return shufflePlayers(state)
    case 'SCORE':
      return addScoreToPlayer(state, action.player, action.reason)
    case 'RESET_SCORE':
      return resetPlayerScore(state, action.player, action.reason)
    case 'DECLARE_WINNER':
      return endGame(declareWinner(state, action.player))
    case 'END_GAME':
      return endGame(state)
    default:
      return state
  }
}

import {
  shuffle,
  newStateWithUpdatedPlayer,
  extractPlayerFromState,
} from './helpers'

export function addPlayer(state, playerName, target) {
  const hasValidName = playerName && playerName.trim().length
  const hasValidTarget = target >= 31 && (target - 1) % 10 === 0
  if (!hasValidName || !hasValidTarget) return state

  return {
    ...state,
    currentPlayerIndex: state.currentPlayerIndex || 0,
    players: [
      ...state.players,
      {
        name: playerName,
        target,
        history: [],
        cumulativeScore: [0],
        score: 0,
        wins: 0,
      },
    ],
  }
}

export function deletePlayer(state, playerName) {
  const playerIndex = state.players.findIndex(p => p.name === playerName)
  return {
    ...state,
    players: [
      ...state.players.slice(0, playerIndex),
      ...state.players.slice(playerIndex + 1),
    ],
  }
}

export function nextPlayer(state) {
  let nextPlayerIndex = state.currentPlayerIndex + 1
  if (nextPlayerIndex >= state.players.length) nextPlayerIndex = 0
  return {
    ...state,
    currentPlayerIndex: nextPlayerIndex,
  }
}

export function previousPlayer(state) {
  let previousPlayerIndex = state.currentPlayerIndex - 1
  if (previousPlayerIndex < 0) previousPlayerIndex = state.players.length - 1
  return {
    ...state,
    currentPlayerIndex: previousPlayerIndex,
  }
}

export function selectPlayer(state, playerName) {
  const index = state.players.findIndex(n => n.name === playerName)
  return index === -1 ? state : {...state, currentPlayerIndex: index}
}

export function shufflePlayers(state, seed) {
  return {
    ...state,
    currentPlayerIndex: 0,
    players: shuffle(state.players, seed),
  }
}

// Note: Winning is not automatic to allow for 'undo'
export function addScoreToPlayer(state, playerName, reason) {
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

export function resetPlayerScore(state, playerName, reason) {
  const player = extractPlayerFromState(state, playerName)
  return newStateWithUpdatedPlayer(state, playerName, {
    history: [...player.history, reason],
  })
}

export function undoPlayerScore(state, playerName) {
  const player = extractPlayerFromState(state, playerName)
  return newStateWithUpdatedPlayer(state, playerName, {
    history: player.history.slice(0, player.history.length - 1),
  })
}

export function declareWinner(state, playerName) {
  const player = extractPlayerFromState(state, playerName)
  if (player.score !== player.target) return state

  const newState = newStateWithUpdatedPlayer(state, playerName, {
    target: player.target + 10,
    wins: player.wins + 1,
  })
  return endGame(newState)
}

export function endGame(state) {
  return {
    ...state,
    players: state.players.map(player => {
      return {
        ...player,
        score: 0,
        history: [],
        cumulativeScore: [0],
      }
    }),
  }
}

import {resetValues, scoreValues} from '../config-constants'

function calculateScore(history) {
  return history.reduce((score, value) => {
    if (resetValues.includes(value)) return 0
    if (scoreValues[value]) return score + scoreValues[value]
    return score
  }, 0)
}

function calculateCumulativeScore(history) {
  return history.reduce(
    (result, value, index) => [
      ...result,
      calculateScore(history.slice(0, index + 1)),
    ],
    [0],
  )
}

export function newStateWithUpdatedPlayer(state, playerName, changes) {
  const playerIndex = state.players.findIndex(p => p.name === playerName)
  const player = {...state.players[playerIndex], ...changes}
  return {
    ...state,
    players: [
      ...state.players.slice(0, playerIndex),
      {
        ...player,
        score: calculateScore(player.history),
        cumulativeScore: calculateCumulativeScore(player.history),
      },
      ...state.players.slice(playerIndex + 1),
    ],
  }
}

export function extractPlayerFromState(state, playerName) {
  return state.players[state.players.findIndex(p => p.name === playerName)]
}

// ref: https://github.com/yixizhang/seed-shuffle/blob/master/index.js
export function shuffle(originalArray, seed) {
  let array = [...originalArray]
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  const random = () => {
    seed = seed || 1
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }

  while (0 !== currentIndex) {
    randomIndex = Math.floor(random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

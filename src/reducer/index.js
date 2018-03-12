import {
  addPlayer,
  deletePlayer,
  nextPlayer,
  previousPlayer,
  selectPlayer,
  shufflePlayers,
  addScoreToPlayer,
  resetPlayerScore,
  undoPlayerScore,
  declareWinner,
  endGame,
} from './reducers'

const initialState = {players: []}

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

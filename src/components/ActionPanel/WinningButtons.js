import React, {Fragment} from 'react'
import EmitterButton from './EmitterButton'

const WinButton = ({player, children, ...props}) => (
  <EmitterButton
    event={{type: 'DECLARE_WINNER'}}
    player={player}
    style={{color: 'green'}}
    {...props}
  >
    {children}
  </EmitterButton>
)

const UndoButton = ({player, children, ...props}) => (
  <EmitterButton
    event={{type: 'UNDO'}}
    player={player}
    style={{color: 'red'}}
    {...props}
  >
    {children}
  </EmitterButton>
)

export default ({currentPlayer}) => {
  return (
    <Fragment>
      <WinButton player={currentPlayer}>Declare winner!</WinButton>
      <UndoButton player={currentPlayer}>Undo</UndoButton>
    </Fragment>
  )
}

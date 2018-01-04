import React from 'react'
import styled from 'styled-components'

const colors = {
  CANNON: 'gray',
  YELLOW: 'yellow',
  GREEN: 'green',
  BLUE: 'blue',
  PINK: 'pink',
  BLACK: 'black',
  FOUL: 'red',
  POO: 'brown',
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Ball = styled.div`
  min-width: 10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 3px;
  background: ${props => colors[props.event]};
`

export default ({history}) => {
  return (
    <Wrapper>
      {history.map((event, index) => <Ball event={event} key={index} />)}
    </Wrapper>
  )
}

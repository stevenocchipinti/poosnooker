import React from 'react'
import styled from 'styled-components'
import {colors} from '../../colors'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 14px;
`
const Ball = styled.div`
  min-width: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 3px;
  background: ${props => colors[props.event]};
  box-shadow: 0px 0px 1px 0px black;
`

export default ({history}) => {
  return (
    <Wrapper>
      {history.map((event, index) => <Ball event={event} key={index} />)}
    </Wrapper>
  )
}

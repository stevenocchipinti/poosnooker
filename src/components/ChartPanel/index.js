import React from 'react'
import styled from 'styled-components'
import Trend from 'react-trend'
import {calculateScore} from '../../reducer/helpers'
import {largeBreakpointHeight} from '../../config-constants'

const Section = styled.section`
  background-color: #e8e8e8;
  flex-grow: 1;
  grid-area: chart-panel;
  display: none;

  @media (min-height: ${largeBreakpointHeight}px) {
    display: flex;
    align-items: center;
    box-shadow: inset 0px 0px 6px -1px rgba(0, 0, 0, 0.2),
      inset 0px 0px 9px 0px rgba(0, 0, 0, 0.14),
      inset 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
  }
`

const Chart = styled(Trend)`
  height: 100%;
`

export default ({history}) => {
  const data =
    history &&
    history.reduce(
      (result, value, index) => [
        ...result,
        calculateScore(history.slice(0, index + 1)),
      ],
      [0],
    )

  return (
    <Section>
      {data &&
        data.length > 1 && (
          <Chart
            smooth
            autoDraw
            autoDrawDuration={1000}
            autoDrawEasing="ease-out"
            data={data}
            gradient={['#2196f3', '#F0F', '#FF0']}
            radius={10}
            strokeWidth={1}
            strokeLinecap={'round'}
          />
        )}
    </Section>
  )
}

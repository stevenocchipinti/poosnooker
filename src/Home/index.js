import React, {Fragment} from 'react'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Hero from './Hero'
import rulesMarkdown from './rules'
import heroImage from './hero.jpg' // ref: https://pxhere.com/en/photo/813038
import setupImage from './setup.png'
import 'typeface-gruppo'

const MAX_WIDTH = '1000px'

const Markdown = styled(ReactMarkdown)`
  font-family: serif;
`

const ButtonPanel = styled.p`
  > * {
    margin: 10px;
  }
`

const Panel = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align || 'center'};
  justify-content: space-between;
  max-width: ${MAX_WIDTH};
  margin: 30px auto;
  padding: 20px;
  margin-bottom: 20px;
`

const ResponsiveImg = styled.img`
  max-width: 100%;
  margin: 10px;
  height: auto;
`

export default () => (
  <Fragment>
    <Hero src={heroImage}>
      <h1>Poo Snooker</h1>
      <ButtonPanel>
        <Button component={Link} to="/game" raised color="primary">
          Start new game
        </Button>
        <Button raised color="primary">
          Register a group
        </Button>
      </ButtonPanel>
    </Hero>
    <h1>How To Play</h1>
    <Panel>
      <ResponsiveImg src={setupImage} alt="Table setup" />
      <Markdown source={rulesMarkdown} />
    </Panel>
  </Fragment>
)

import React, {Component, Fragment} from 'react'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import {createNewGame} from '../../backend'
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

export default class Home extends Component {
  // TODO: Show loading indicator while waiting for a new game id
  state = {loading: false}

  async newAnonymousGame() {
    this.setState({loading: true})
    const gameUrl = await createNewGame()
    this.props.history.push(gameUrl)
  }

  render() {
    return (
      <Fragment>
        <Hero src={heroImage}>
          <h1>Poo Snooker</h1>
          <ButtonPanel>
            <Button
              onClick={() => this.newAnonymousGame()}
              variant="raised"
              size="large"
              color="primary"
            >
              Start new game
            </Button>
            {/* TODO: Groups
            <Button variant="raised" color="primary">
              Register a group
            </Button>
            */}
          </ButtonPanel>
        </Hero>

        <h1>How To Play</h1>
        <Panel>
          <ResponsiveImg src={setupImage} alt="Table setup" />
          <Markdown source={rulesMarkdown} />
        </Panel>
      </Fragment>
    )
  }
}

import React, {Fragment} from 'react'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import rulesMarkdown from './rules'
import heroImage from './hero.jpg' // ref: https://pxhere.com/en/photo/813038
import setupImage from './setup.png'
import 'typeface-cinzel-decorative'

const MAX_WIDTH = '1000px'

const Hero = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 600px;
  padding: 30px 0 45px 0;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.65) 100%
  ), url('${heroImage}') no-repeat center center;
  background-size: cover;
  color: white;

  position: relative;
  &:before {
    content: '\\27E9';
    font-family: 'sans-serif';
    font-size: 30px;
    position: absolute;
    bottom: 15px;
    transform: rotate(90deg) translateY(0px);
    @keyframes float {
      from { transform: rotate(90deg) translateX(0px) }
      to { transform: rotate(90deg) translateX(-4px) }
    }
    animation: 1s ease 0s infinite alternate both running float;
  }
`

const Heading = styled.h1`
  font-family: 'Cinzel Decorative', cursive, serif;
  text-align: center;
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
    <Hero>
      <Heading>Poo Snooker</Heading>
      <ButtonPanel>
        <Button component={Link} to="/game" raised color="primary">
          Start new game
        </Button>
        <Button raised color="primary">
          Register a group
        </Button>
      </ButtonPanel>
    </Hero>
    <Heading>How To Play</Heading>
    <Panel>
      <ResponsiveImg src={setupImage} alt="Table setup" />
      <ReactMarkdown source={rulesMarkdown} />
    </Panel>
  </Fragment>
)

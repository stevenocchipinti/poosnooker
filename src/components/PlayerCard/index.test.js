import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import {PlayerCard, SmallPlayerCard, PlayerCardItem} from '.'

describe('PlayerCard', () => {
  const player = {
    name: 'Player',
    score: 10,
    target: 31,
    history: ['CANNON', 'BLUE', 'GREEN'],
  }

  describe('standard variant', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<PlayerCard player={player} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('small variant', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<SmallPlayerCard player={player} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('list item variant', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<PlayerCardItem player={player} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})

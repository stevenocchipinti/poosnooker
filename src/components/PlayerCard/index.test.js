import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import PlayerCard from '.'

describe('PlayerCard', () => {
  const player = {
    name: 'Player',
    score: 10,
    target: 31,
    history: ['CANNON', 'BLUE', 'GREEN'],
  }

  describe('default variant', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<PlayerCard player={player} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('standard variant', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<PlayerCard variant="standard" player={player} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('large variant', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<PlayerCard variant="large" player={player} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('horizontal variant', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<PlayerCard variant="horizontal" player={player} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})

import React from 'react'
import renderer from 'react-test-renderer'
import Item from '../components/layout/Item'

it('rederizando o componente item',() => {
    const tree = renderer.create(<Item  />).toJSON();
    expect(tree).toMatchSnapshot();
})
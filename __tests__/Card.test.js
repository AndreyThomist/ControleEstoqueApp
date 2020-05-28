import React from 'react'
import renderer from 'react-test-renderer'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

/* Componente Auxiliar está renderizando*/
it('renders correctly',() => {
    const tree = renderer.create(<Card><Input /></Card>).toJSON();
    expect(tree).toMatchSnapshot();
})

import React from 'react'
import renderer from 'react-test-renderer'
import Input from '../components/ui/Input'

const ref = <Input style={{}} touched={false} errorMessage={null} value="ronie" label="nome" />

/* Componente Auxiliar está renderizando*/
it('renders correctly',() => {
    const tree = renderer.create(ref).toJSON();
    expect(tree).toMatchSnapshot();
})

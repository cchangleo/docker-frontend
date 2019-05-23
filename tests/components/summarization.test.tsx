import * as React from "react"
import * as Enzyme from 'enzyme'
import Summarization from '../../src/components/summarization'

test('Should render without errors', () => {
  const wrapper = Enzyme.shallow(<Summarization />)

  expect(wrapper.find('button')).toHaveLength(3)
})

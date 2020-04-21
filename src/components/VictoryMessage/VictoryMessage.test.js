import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import VictoryMessage from './'

Enzyme.configure({ adapter: new Adapter() })

const testText = 'test'

describe('Card', () => {

  describe('Render', () => {

    describe('Without props', () => {

      it('should not render', () => {
        expect(shallow(<VictoryMessage/>).html()).toBeNull()
      })
    })

    describe('With props', () => {
      const wrapper = shallow(<VictoryMessage show text={ testText }/>)

      it('should not fails to render', () => {
        expect(wrapper.find('.victory-message')).toHaveLength(1)
      })

      it('should render proper text', () => {
        expect(wrapper.find('p').text()).toBe(testText)
      })
    })
  })

  describe('User Interactions', () => {
    const wrapper = shallow(<VictoryMessage show text={ testText } />)
    const mockFunc = jest.fn()
    wrapper.setProps({ onClick: mockFunc })

    it('should call mockFunc on click', () => {
      const card = wrapper.find('.popup')
      card.simulate('click')
      expect(mockFunc).toHaveBeenCalledTimes(1)
    })
  })
})
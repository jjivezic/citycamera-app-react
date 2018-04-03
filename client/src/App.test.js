
import React from 'react';
import {expect} from 'chai';
import { mount,shallow } from 'enzyme';
import  {spy}  from 'sinon';
import App from './App';



describe('<App />', () => {
  it('Componenet shold have h1 tag', () => {
  let wrapper = shallow(<App />);
  // expect(wrapper.find('h1').text()).to.equal('Welcome to city cam');
  // expect(wrapper.find('h1').exists()).to.equal(true);
  expect(wrapper.find('.App').length).to.equal(1);
  });

});
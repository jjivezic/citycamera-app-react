
import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import {MemoryRouter} from 'react-router'

import {Register} from './register';

describe('<Register />', () =>{
 
    it('sould write something', () => {
        let wrapper = mount(<Register/>);
      //  wrapper.state('username').should.equal('cordiaca');
    });

})
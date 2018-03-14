import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Login } from './login';

describe('<Login />', () => {
    // make our assertion and what we expect to happen 


    xit('should update state on click', function () {
        const wrapper = mount(<Login />);
    });
    xit('should render without throwing an error', () => {
        expect(shallow(<Login />).exists(<div className="auth-page"></div>)).to.equal(true)
    })
    xit('renders a username input', () => {
        expect(shallow(<Login />).find('#username').length).to.equal(1)
    })
   xit('renders a password input', () => {
        expect(shallow(<Login />).find('#password').length).to.equal(1)
    })
    it('should have an initial username state', () => {
        let wrapper = mount(<Login />);
        wrapper.setState({ redirectToReferrer: false });
        expect(wrapper.state().username).to.equal('');
    });
    xit('should have an initial password state', () => {
        let wrapper = mount(<Login />);
        expect(wrapper.state().password).to.equal('');
    });
    xit('should update the src state on clicking fetch', function () {
        const wrapper = mount(<Login />);
        wrapper.setState({ email: 'user@user.com', username: 'jelena', password: '1234' });
        wrapper.find('button').simulate('click');
        expect(wrapper.state('username')).to.equal('jelena');
        expect(wrapper.state('password')).to.equal('1234');
    });


})

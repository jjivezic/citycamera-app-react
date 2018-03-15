
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Register } from './register';
import faker from 'faker';

describe('<Register />', () => {
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
        expect(shallow(<Register />).exists(<div className="auth-page"></div>)).to.equal(true)
    })
    it('renders a username input', () => {
        expect(shallow(<Register />).find('#username').length).to.equal(1)
    })
    it('renders a email input', () => {
        expect(shallow(<Register />).find('#email').length).to.equal(1)
    })
    it('renders a password input', () => {
        expect(shallow(<Register />).find('#password').length).to.equal(1)
    })
    it('should have an initial username state', () => {
        let wrapper = mount(<Register />);
        expect(wrapper.state().username).to.equal('');
    });
    it('should have an initial password state', () => {
        let wrapper = mount(<Register />);
        expect(wrapper.state().password).to.equal('');
    });
    it('should have an initial email state', () => {
        let wrapper = mount(<Register />);
        expect(wrapper.state().email).to.equal('');
    });
    
it('should update state on click', function () {
        const wrapper = mount(<Register />);
        const username = faker.name.firstName();
        const email = faker.internet.email();
        const password = faker.internet.password();        
        wrapper.setState({ email: email, username: username, password: password });
        wrapper.find('form').simulate('submit');
        expect(wrapper.state('username')).to.equal(username);
        expect(wrapper.state('email')).to.equal(email);
        expect(wrapper.state('password')).to.equal(password);
      //  console.log('this state',wrapper.instance())
    });

})
describe('Username input', () => {

    it('should respond to change event and change the state of the Register Component', () => {
        const username = faker.name.findName();
        const wrapper = shallow(<Register />);
        wrapper.find('#username').simulate('change', { target: { name: 'username', value: username } });

        expect(wrapper.state('username')).to.equal(username);
    })
})
describe('Email input', () => {
    it('should respond to change event and change the state of the Register Component', () => {
        const wrapper = shallow(<Register />);
        wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'blah@gmail.com' } });
        expect(wrapper.state('email')).to.equal('blah@gmail.com');
    })
})

describe('Password input', () => {

    it('should respond to change event and change the state of the Register Component', () => {

        const wrapper = shallow(<Register />);
        wrapper.find('#password').simulate('change', { target: { name: 'password', value: '1234' } });

        expect(wrapper.state('password')).to.equal('1234');
    })
})

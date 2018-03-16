
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import axios from 'axios';
import sinon from 'sinon';
import { Register } from './register';
import faker from 'faker';
//local storadge mock
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
global.localStorage = mock.getLocalStorage();

var MockAdapter = require('axios-mock-adapter');
var mockAxios = new MockAdapter(axios);

let testUser = {
    password: '1234',
    username: 'cordiaca',
    email: 'jj_ivezic@yahoo.com',
};

let data =   {
    success: true
}

mockAxios.onPost('http://localhost:3000/user/register', testUser).reply(200, data);

describe('<Register />', () => {
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {

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

    it('Test register api on submit ', function () {
        const wrapper = mount(<Register />);
        wrapper.setState({ username: 'jelena', password: '1234', email: 'email@yahoo.com' });
        wrapper.find('form').simulate('submit');
        // setImmediate(() => {
        //     expect(global.localStorage.getItem('user')).to.equal(JSON.stringify(data))
        // })

    })
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

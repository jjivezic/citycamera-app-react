import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Login from './login';
import axios from 'axios';
import sinon from 'sinon';
//local storadge mock
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
global.localStorage = mock.getLocalStorage();

var MockAdapter = require('axios-mock-adapter');
var mockAxios = new MockAdapter(axios);

let testUser = {
    password: '1234',
    username: 'jelena',
    email: 'jj_ivezic@yahoo.com',
    isAdmin: true,
};

let data = {
    user: testUser,
    token: 'eretetertre'
}

mockAxios.onPost('http://localhost:3000/user/login', { username: 'jelena', password: '1234' }).reply(200, data);


describe('<Login />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Login />);

    });

    it('should render <Login /> without throwing an error', () => {
        expect(wrapper.find(Login).render().find('form')).to.have.length(1);
 })
  
    it('renders a username and password input', () => {
        expect(mount(<Login />).find('#username').length).to.equal(1);
        expect(mount(<Login />).find('#password').length).to.equal(1)
    })
 
    it('should have an initial username, password state', () => {
        expect(wrapper.state().username).to.equal('');
        expect(wrapper.state().password).to.equal('');
    });

    it('should update state on click', function () {
        wrapper.setState({ email: 'user@user.com', username: 'jelena', password: '1234' });
        wrapper.find('button').simulate('click');
        expect(wrapper.state('username')).to.equal('jelena');
        expect(wrapper.state('password')).to.equal('1234');
    });
    it('test login API on submit ', function () {
        wrapper.setState({ username: 'jelena', password: '1234' });
        wrapper.find('form').simulate('submit');
        setImmediate(() => {
            expect(global.localStorage.getItem('user')).to.equal(JSON.stringify(data))
        })
    });
})

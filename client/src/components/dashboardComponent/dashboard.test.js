import React from 'react';
import axios from 'axios';
import { mount, shallow, render } from 'enzyme';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { HashRouter as Router } from 'react-router-dom';//or MemoryRouter
import Dashboard from './dashboard';
import Files from '../foldersComponent/files';
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();

global.localStorage = mock.getLocalStorage();

var MockAdapter = require('axios-mock-adapter');
var mockAxios = new MockAdapter(axios);

//get Folders
let folders = {
    folders: ['2018-01-28', '2018-02-28']
}

mockAxios.onGet('http://localhost:3000/file/folders/null').reply(200, folders);

describe('<Dashboard />', () => {
    // let wrapper;
    // beforeEach(() => {
    //  wrapper = mount(<Router><Dashboard /></Router>);

    // });
    let mountWithRouter = node => mount(<Router>{node}</Router>);//za <Link da ne izbacuje da mora biti inside Router

    it('calls componentDidMount() lifecycle method', () => {
        const componentDidMountSpy = sinon.spy(Dashboard.prototype, 'componentDidMount');
        const wrapper = mount(<Router><Dashboard /></Router>)
        //console.log(wrapper.instance());
        expect(Dashboard.prototype.componentDidMount.calledOnce).to.be.true;
    });
    it('calls getFolders() method', () => {
        const getFoldersSpy = sinon.spy(Dashboard.prototype, 'getFolders');
        const wrapper = mountWithRouter(<Dashboard />);
        expect(Dashboard.prototype.getFolders.callCount).to.equal(1)
        wrapper.setState(folders);

        setImmediate(() => {
            expect(wrapper.state('folders')).to.equal(folders.folders);
            expect(wrapper.state('folders')).to.have.length(2)
        });
    });
    it('test dashboard link routes', () => {
        const wrapper = mount(<Router><Dashboard /></Router>);

        var linkFolder = wrapper
            .find('Link')
            .find({ to: '/dashboard/folder' })
        //   console.log(wrapper.debug());
        expect(linkFolder.props().to).to.equal('/dashboard/folder');
        var linkUpload = wrapper
            .find('Link')
            .find({ to: '/dashboard/upload' })
        expect(linkUpload.props().to).to.equal('/dashboard/upload');
    });
})
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { expect, assert } from 'chai';
import { MemoryRouter as Router } from 'react-router-dom';//or MemoryRouter
import Folders from './folders';
import Files from './files';
import Dashboard from '../dashboardComponent/dashboard';
import sinon from 'sinon';
import axios from 'axios';


var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();

global.localStorage = mock.getLocalStorage();

var MockAdapter = require('axios-mock-adapter');
var mockAxios = new MockAdapter(axios);

//get Files
let files = {
    files: [
        { _id: 1, fileName: 'file_1', ext: "jpg" },
        { _id: 2, fileName: 'file_2', ext: "jpg" },
        { _id: 3, fileName: 'file_3', ext: "jpg" }
    ]
}
mockAxios.onGet('http://localhost:3000/file/null/folder1/files').reply(200,files);

//get Folders
let folders = {
    folders: ['2018-01-28', '2018-02-28']
}

mockAxios.onGet('http://localhost:3000/file/folders/null').reply(200, folders);

describe('<Folders />', () => {
    it('On click show files', () => {
        const wrapper = mount(<Folders folders={['folder1', 'folder2']} />);
        expect(wrapper.find('.folder-link')).to.have.length(2);
        wrapper.find('#folder1').simulate('click');
        setImmediate(() => {
            wrapper.update();
            expect(wrapper.find(Files).length).to.equal(1); 
            expect(wrapper.find('.file-preview')).to.have.length(3);
        });

    })



})

const mountWithRouter = node => mount(<Router>{node}</Router>);//za <Link da ne izbacuje da mora biti inside Router

describe('<Dashboard />', () => {
    it('calls componentDidMount() lifecycle method', () => {
        const componentDidMountSpy = sinon.spy(Dashboard.prototype, 'componentDidMount');
        const wrapper = mountWithRouter(<Dashboard />);
        expect(Dashboard.prototype.componentDidMount.calledOnce).to.be.true;
    });
    it('calls getFolders() method', () => {
        const getFoldersSpy = sinon.spy(Dashboard.prototype, 'getFolders');
        const wrapper = mountWithRouter(<Dashboard />);

        expect(Dashboard.prototype.getFolders.calledOnce).to.be.true;
        wrapper.setState(folders);

        setImmediate(() => {;
            expect(wrapper.state('folders')).to.equal(folders.folders);
             expect(wrapper.state('folders')).to.have.length(2)
        });
    });
    it('check props for files', () => {
    const wrapper = mount(<Files  listFiles={files.files}/>);
    setImmediate(() => {
       // wrapper.update();
        expect((wrapper.props().listFiles).length).to.equal(3);
    });
    //    console.log('len',wrapper.getElement());//for statelass component insted on instance()
    });
})

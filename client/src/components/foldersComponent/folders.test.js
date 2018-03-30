import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { expect, assert } from 'chai';
import { HashRouter as Router } from 'react-router-dom';//or MemoryRouter
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
mockAxios.onGet('http://localhost:3000/file/null/folder1/files').reply(200, files);



// const mountWithRouter = node => {
//     console.log('wraper>>>', node)
//     return mount(<Router>{node}</Router>);//za <Link da ne izbacuje da mora biti inside Router

// }
describe('<Folders />', () => {

    beforeEach(() => {

    });
    it('On click show files', () => {
        const wrapper = mount(<Router><Folders folders={['folder1', 'folder2']} /></Router>);
      //  console.log(wrapper.debug());
        wrapper.find('a#my-folder1').simulate('click');
        setImmediate(() => {
            wrapper.update();
            expect(wrapper.find(Files).length).to.equal(1);
            expect(wrapper.find('.file-preview')).to.have.length(3);
        });

    })
    it('check props for files', () => {
        const wrapper = mount(<Files listFiles={files.files} />);
        //console.log(wrapper.getElement().props.listFiles);
        setImmediate(() => {
            wrapper.update();
            expect((wrapper.props().listFiles).length).to.equal(3);
        });
        //    console.log('len',wrapper.getElement());//for statelass component insted on instance()
    });
})



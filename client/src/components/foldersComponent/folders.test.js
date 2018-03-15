import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect, assert } from 'chai';
import { Folders } from './folders';
import sinon from 'sinon';
import axios from 'axios';


var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();

global.localStorage = mock.getLocalStorage();

var MockAdapter = require('axios-mock-adapter');
var mockAxios = new MockAdapter(axios);

mockAxios.onGet('http://localhost:3000/file/null/folder1/files').reply(200, {
    files: [
        { _id: 1, fileName: 'file_1', ext: "jpg" },
        { _id: 2, fileName: 'file_2', ext: "jpg" },
        { _id: 3, fileName: 'file_3', ext: "jpg" }
    ]
});

describe('<Folders />', () => {
    it('On click show files', () => {

        const wrapper = mount(<Folders folders={['folder1', 'folder2']} />);
        expect(wrapper.find('.folder-link')).to.have.length(2);

        wrapper.find('#folder1').simulate('click');
        setImmediate(() => {
            wrapper.update();
            expect(wrapper.find('.file-preview')).to.have.length(3);
        });

    })



})


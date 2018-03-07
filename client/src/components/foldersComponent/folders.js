import React from 'react';
import { Link, Route } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
import { filesService } from '../../services/file.service';

console.log('filesService Folders componenta')

export class Folders extends React.Component {
    constructor() {
        super()
        this.state = {
            items: []
        }
    }
    componentWillMount() {
     filesService.userFolders().then(response => {
            console.log('response', response.data);
            this.setState({
                items: response.data.folders
            });
        }).catch(function (error) {
            console.log('error filesService', error);
        });
    }

    render() {
        let items = this.state.items;
        return (

            <div>
                <h1>Folders</h1>
                <ul>
                    {items.map((item, i) =>
                        <li> <a href="#" key={i}>{item}</a>  </li>
                    )}
                </ul>
            </div>
        )
    }
}
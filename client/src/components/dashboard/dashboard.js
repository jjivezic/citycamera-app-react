import React from 'react';
import { Link, Route } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
export const  Dashboard = ({ match }) => {
//export class Dashboard extends React.Component {
  //  render() {
        return (

            <div>
                <h1>Dashboard</h1>
                <ul>
                    <li><Link to={`${match.url}/folders`}>Folders</Link></li>
                    <li><Link to={`${match.url}/files`}>Files</Link></li>
                    <li><Link to={`${match.url}/admin`}>Admin</Link></li>
                    <li><a href="" onClick={() => {sessionService.destroy()}} >Logout</a></li>
                </ul>
                <Route path={`${match.path}/:name`} render={({ match }) => (<div> <h3> {match.params.name} </h3></div>)} />
            </div>
        )

  }


//}
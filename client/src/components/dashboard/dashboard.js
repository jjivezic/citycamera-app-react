import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
import { Folders } from '../foldersComponent/folders';
import { Users } from '../foldersComponent/listUsers';


export const Dashboard = () => {
    return (

        <div>
            <nav className="">
                <ul className="">
                    <li>
                        <Link to="/dashboard/folder">Folders</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/admin">Admin Update user</Link>
                    </li>
                    <li><a href="" onClick={() => { sessionService.destroy() }} >Logout</a></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/dashboard/folder" component={Folders} />
                <Route path="/dashboard/test" component={Test} />
                <Route path="/dashboard/admin" component={Users} />
            </Switch>
        </div>
    )

}

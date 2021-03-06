import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import { withRouter } from 'react-router-dom';
import './custom.css'

 const App = (props) =>  {
     const [accToken, setAccToken] = useState({
         refresh_token: 'sample_refresh_token_here_view_me_in_child_components',
         userName: 'iMISUser@RedirectedToClientApp',
         access_token: 'sample_access_token_view_me_in_child_components'
     });


    return (
        <Layout>
            <Route exact path='/' render={() => <Home  accTokenStuff={{...props, accToken, setAccToken }} />} />
      </Layout>
    );

}

export default withRouter(App);

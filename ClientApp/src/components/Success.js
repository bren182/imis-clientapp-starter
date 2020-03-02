﻿import React, { useEffect } from 'react';
import CustomQueries from './CustomQueries';

const Success = (props) =>
{

    //useState from success to populate authHeaders for CustomQueries
    const customAuthToken = props.accTokenStuff.access_token;
    document.cookie = props.accTokenStuff.access_token;

    useEffect(() => {
       // console.log(props.appProps.accTokenStuff);
       // console.log(props.appProps.accTokenStuff.access_token);
        console.log('logging iMISToken.js props', props);
        console.log('logging all cookies in success.js', document.cookie);

    }, [])

    return (
        <>
            <h3>Success!</h3>
            <p>refresh_token: {props.accTokenStuff.refresh_token}</p>
            <p>access_token: {props.accTokenStuff.access_token}</p>
            <p>userName: {props.accTokenStuff.userName} </p> 
            <p>Run iMIS API Collection Query and view Results in Console (devConsole)</p>
            <CustomQueries appProps={customAuthToken} />

        </>    
         )
    }
    
export default Success;
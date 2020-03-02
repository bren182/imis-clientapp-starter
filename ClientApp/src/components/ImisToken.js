/*                          --==iMIS Token Sample Page==--
 *  This will act as the in-between screen to your clientApp. From here I would suggest
 * ripping out/duplicating whats in here to have it set variables in your App.js, so its easier to
 * pass the state containing the iMIS user's current access_token and iMIS to the rest of your app.
 * 
 * Heck, might even refactor this to accomplish top part.
 *  
 * Lifted state up to App component for setting access_token details.
 * Flow should now be...
 * Log Into iMIS App --> User Clicks Link to SSO Redirect iPart --> User is Redirected to 3rd party app -->
 * User confirms continuing to 3rd party app (POST to token endpoint) --> User lands on Client App 'Home'/Success.js page.
 * 
*/
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';

const ImisToken = (props) =>
{
    const [refreshbody, setRefreshBody] = useState({
        //configure your client id here
        grant_type:'refresh_token',
        client_id:'test123',
        client_secret: 'test123!',
        //keeping refresh_token empty at the start
        refresh_token: '',

    })
    const [data, setData] = useState();
    const [isSuccess, setIsSuccess] = useState();


    //useEffect will trigger when GET request is sent from app to fetch session token
    useEffect(() =>
    {
        if (data != null)
        {
            setRefreshBody({ ...refreshbody, refresh_token: data })
        }
    }, [data])



    //useEffect(() =>
    //{
    //    console.log('show success: ', isSuccess);
    //    console.log('get refresh_body: ', refreshbody);
    //}, [isSuccess])

    ////refreshbody changes with GET request to session info, action fires to log refreshbody
    //useEffect(() =>
    //{
    //    console.log('logging new refreshbody!', refreshbody);
    //}, [refreshbody])

    //fetch session details from backend
    useEffect(() =>
    {
        try {

            fetch('/getimistoken')
                .then(resp => resp.json())
                .then(result => setData(result.value))
                .then(() => setIsSuccess(true))
                .catch(err => window.alert('whoops!'.concat(" ", err.message)));

            console.log('logging iMISToken.js props', props);
        }
        catch (Err) {
            console.log('Error while useEffect fired: ', Err.message);
        }
    }, [])

    const postRefresh = ()  =>
    {
        try {
            var bodyReq = new URLSearchParams(refreshbody);
            fetch('https://atkvimistesthk.atkv.co.za/ASI.Scheduler_iMIS0/token',
                {
                    method: 'POST',
                    body: bodyReq
                })
                .then(response =>  response.json())
                .then(data => props.appProps.accTokenStuff.setAccToken(data))
                .then(() => props.history.push('/success'))
                .catch(err => window.alert('whoops!'.concat(" ", err.message)))

            console.log('access token posted and forwarded to /success', props);
            console.log('logging iMISToken.js props', props);


        }
        catch (Err) {
            console.log('Error while running custom query: ', Err.message);
        }
        
    }

    const getQuery = () => {

        try {
            console.log("Logging Bearer " + props.appProps.accTokenStuff.accToken.access_token);
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET", "https://atkvimistesthk.atkv.co.za/ASI.Scheduler_iMIS0/api/party/23196", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Authorization", "Bearer " + props.appProps.accTokenStuff.accToken.access_token);
            xhttp.send();
            //fetch('https://atkvimistesthk.atkv.co.za/ASI.Scheduler_iMIS0/api/party/23196',
            //    {
            //        method: 'GET',
            //        headers:
            //        {
            //            'Authorization': "Bearer ".concat(props.appProps.accTokenStuff.accToken.access_token),
            //        }
            //    })
            //    .then(response => response.json)
            //    .then(data => console.log("woooow, fetch data query logged: ", data))
            //    .catch(err => {
            //        console.log('err in imiscollectionqueries ', err);
            //    });
        }
        catch (Err) {
            console.log(Err.message);
        }

    }



    return (
        <>
                    
                    
            <div className="container">
                <h3 className="display-5">Let's go!</h3>
                <button onClick={postRefresh} disabled={!isSuccess} className="btn btn-primary">Continue To 3rd Party App</button>
                <dt className="col-sm-3">Refresh_Token received from iMIS: </dt>
                <dd className="col-sm-9">{data}</dd>
                <button onClick={getQuery} className="btn btn-primary">Click Me to Get User 23196</button>


                </div>
                
           
        </>
        )
}
export default withRouter(ImisToken);
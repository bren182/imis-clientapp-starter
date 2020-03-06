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

    const [data, setData] = useState("");
    const [isSuccess, setIsSuccess] = useState();
    const [testToken, setTestToken] = useState();
    const [userInfo, setUserInfo] = useState();
    const [partyId, setPartyId] = useState("");

    useEffect(() =>
    {
        console.log('NEW USER INFO: ', userInfo)
    }, [userInfo])

    //useEffect will trigger when GET request is sent from app to fetch session token
    useEffect(() =>
    {
        if (data != null)
        {
            setRefreshBody({ ...refreshbody, refresh_token: data })
        }
    }, [data])

    useEffect(() =>
    {
        document.cookie = ("access_token=".concat(testToken));


    }, [testToken])


    ////fetch session details from backend
    //useEffect(() =>
    //{
    //    try {

    //        fetch('/getimistoken')
    //            .then(resp => resp.json())
    //            .then(result => setData(result.value))
    //            .then(() => setIsSuccess(true))
    //            .catch(err => window.alert('whoops!'.concat(" ", err.message)));
    //    }
    //    catch (Err) {
    //        console.log('Error while useEffect fired: ', Err.message);
    //    }
    //}, [])

    const postRefresh = ()  =>
    {
        try {
            var bodyReq = new URLSearchParams(refreshbody);
            fetch('https://atkvimistesthk.atkv.co.za/ASI.Scheduler_iMIS0/token',
                {
                    method: 'POST',
                    body: bodyReq
                })
                .then(response => response.json())
                .then(data => { props.appProps.accTokenStuff.setAccToken(data); document.cookie = "access_token=".concat(data.access_token) })
                //.then(() => props.history.push('/success'))
                .catch(err => window.alert('whoops!'.concat(" ", err.message)))
        }
        catch (Err) {
            console.log('Error while running custom query: ', Err.message);
        }
        
    }

    const inputTestTokenChange = (e) => {
        setTestToken(e.target.value);
        console.log('set test token,1  behind here', testToken);
    }

    const getQuerySafe = () => {
        try {
            fetch('getparty/'.concat(partyId))
                .then(response => response.json())
                .then(data => setUserInfo(data))
                .catch(err => {
                    console.log('err in imiscollectionqueries ', err);
                });
        }
        catch (Err) {
            console.log(Err.message);
        }

    }

    const changePartyId = (e) => {
        setPartyId(e.target.value);
    }

    return (
        <>                    
            <div className="container">
                <div className="row">
                    <h3 className="display-5">Let's go!</h3>
                        <p>iMIS will redirect the user to this page with a refresh_token,
                           below button will <strong>POST</strong> to token endpoint with
                           <strong>Refresh_Token</strong> value to get an <strong>Access_Token</strong>.
                        </p>
                </div>
                <div className="row">

                        <p>Refresh_Token received from iMIS: <br />            
                            {data == "" ? <>No refresh_token here...</> : <>{data}</>}
                    </p>
                </div>
                <div className="row mb-2">
                        <button onClick={postRefresh} disabled={!isSuccess} className="btn btn-primary">Continue To 3rd Party App</button>
                </div>
                <div className="row mb-2">
                    <p>Test Locally with Access_Token value in below input box</p>            
                </div>
                <div className="row my-2">
                    <input onChange={inputTestTokenChange} placeholder="Enter Acc Token Here..." />
                </div>
                <div className="row my-2">
                    <input id="partyId" onChange={changePartyId} placeholder="Enter PartyId Here..." />                
                </div>
                <div className="row">
                    <button onClick={getQuerySafe} className="btn btn-primary">Click Me to Get Party By Id {partyId}</button>
                </div>
            </div>     
        </>
    )
}
export default withRouter(ImisToken);
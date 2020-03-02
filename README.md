### Let's go!

##### How it works: (DEV/TEST Environment Only)

-   Make sure your iMIS and Client App are hosted on the same IIS server.
-   Add self-signed certificates to the client app hosted on IIS, will require them to be able to send POST requests from app to iMIS instance.
-   For testing:
    -   Grab any refresh\_token value or paste any string into the inputbox (`"Type Token In Here..."`)
    -   "Post A Session Token!" will post the value entered into inputbox to the backend and set the value as new session variable for `'refresh_token'`
    -   "Get Current Session Token!" will fetch the last stored `session token` using backend controllers.
-   "Continue To 3rd Party App" option will post to the configured token endpoint `https://imisinstance.org.za/Asi.Scheduler_iMIS0/token` and request response is set in local React state. In other words your `access_token` can be accessed in React's state.

    E.g When redirected and "Continue To 3rd Party App" option is clicked, the response access\_token can be accessed in `accToken.access_token` property.
    
 #### To Do:
 
 [x] Complete `GET` request with the received `access_token`.
 [x] Refactor messy code / remove commented code.
 [x] Maybe open up a trello board instead of editing these to-do's here.



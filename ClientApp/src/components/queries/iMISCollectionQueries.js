export default class iMISCollectionQueries
{
    constructor(queryType, entityType) {
        this.querytype = queryType;
        this.entitytype = entityType;
        this.result = "";
    }

    runQuery(authToken) {
        try {
            fetch('https://atkvimistesthk.atkv.co.za/ASI.Scheduler_iMIS0/api/party/23196',
                {
                    method: 'GET',
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + document.cookie,
                        
                    }
                })
                .then(response => response.json)
                .then(data => this.result = data)
                .catch(err => {
                    console.log('err in imiscollectionqueries ', err);
                });
            return "I have a " + this.result;
        }
        catch (Err) {
            this.result = "ERROR IN QUERY";
            return this.result;
        }
    }


//var dest = GetRestApiUrl() + "/api/Party/" + partyId;
//log("Performing GET to " + dest + " with access_token set as a bearer token in the Authorization header...");
//xhttp.open("GET", dest, true);
//xhttp.setRequestHeader("Content-type", "application/json");
//xhttp.setRequestHeader("Authorization", "Bearer " + document.getElementById('accessToken').value);
//xhttp.send();
}


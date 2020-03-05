import React from 'react';
import iMISCollectionQueries from './queries/iMISCollectionQueries';

const CustomQueries = (props) => {
    const runCustomQuery = () => {
        console.log('iMISCollectionQueries: ', new iMISCollectionQueries('queryTypeGivenHere', 'entityTypeGivenHere').runQuery(props.appProps));
    }

    const runQuery = () =>
    {
        try {
            fetch('https://atkvimistesthk.atkv.co.za/ASI.Scheduler_iMIS0/api/party/23196',
                {
                    method: 'GET',
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Access_Token': "Bearer " + document.cookie,

                    }
                })
                .then(response => response.json)
                .then(data => console.log('success query get data: ', data)
                    .catch(err => {
                        console.log('err in imiscollectionqueries ', err);
                    }))
        }
        catch (Err) {
            console.log(Err.message);
        }

    }

    return (


        <button onClick={runQuery} className="btn btn-secondary">Run Custom Query</button>

        )

}

export default CustomQueries;
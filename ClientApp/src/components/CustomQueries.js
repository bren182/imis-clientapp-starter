import React from 'react';
import iMISCollectionQueries from './queries/iMISCollectionQueries';

const CustomQueries = (props) =>
{
    const runCustomQuery = () => {
        console.log('running custom query with auth token... ', props);
        console.log('iMISCollectionQueries: ', new iMISCollectionQueries('queryTypeGivenHere', 'entityTypeGivenHere').runQuery(props.appProps));
    } 

    return (


        <button onClick={runCustomQuery} className="btn btn-secondary">Run Custom Query</button>

        )

}

export default CustomQueries;
import React, { useEffect } from 'react';
import ImisToken from './ImisToken';


const Home = (props) => {

     return (
        <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
                <p className="lead">Welcome to your new iMIS client app starter-kit! Built with:</p>
                    <ul className="list-group list-group-horizontal">
                        <li className="list-group-item"><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code.</li>
                        <li className="list-group-item"><a href='https://facebook.github.io/react/'>React</a> for client-side code.</li>
                        <li className="list-group-item"><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                    </ul>
                <hr className="my-4" />
            <ImisToken appProps={props} />
      </div>
    );
}

export default Home;

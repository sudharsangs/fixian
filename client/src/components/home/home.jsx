import React from 'react';
//import {Link,  withRouter} from 'react-router-dom';
import customer from '../../assets/customer.png';
import './home.css';


 function Home(){
    return(
        <div className="wrapper">
            <h1>Fixian</h1>
                
                     <div className="element">
                       <img src={customer} className="customer"/>
                     </div>
              
            
            
        </div>
    )
}

export default Home;
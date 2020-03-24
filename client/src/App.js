import React from 'react';
import './App.css';
//import Mapss from './components/maps';
import Signup from './components/signup';
import Bg from './assets/bg.jpg';

function App() {
  return (
    <Router>
        <Navbar />
          <br/>
              <Route path="/" exact component={Home} />
              <Route path="/mechs" exact component={LivePrice} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/admin" exact component={Admin} />
              <Route path="/login" exact component={LogIn} />
      </Router>

    
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router';
import NavBar from './NavBar';
import Footer from './Footer';

var App = React.createClass ({
  render : function () {
    return (
      <div>
        <NavBar isLogin={false}/>
        <div className="container">
          {this.props.children}
          <Footer text="Copyright &copy; Guardian 2016" />
        </div>
        <hr />
      </div>
    );
  }
});
export default App;

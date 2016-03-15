import React from 'react';

export default class App extends React.Component {
  render() {
    var paddingStyle = {
      height: 400
    };
    return (
      <div className="container">
        <div className="row" style={paddingStyle}>
        </div>
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <form className="form-group" role="form">
              <div className="row">
                <div className="col-sm-10 col">
                  <input type="text" className="form-control" placeholder="Check your product authticity"></input>
                </div>
                <div className="col-sm-2 col">
                  <button type="button" className="btn btn-primary">Check</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row" style={{height: 100}}></div>
        <div className="row">
          <div className="col-sm-6">
            <div className="panel panel-info">
              <div className="panel-heading">Sign in as a Manufacturer</div>
              <div className="panel-body">
                <ul className="list-group">
                  <li className="list-group-item">Add you own Brands</li>
                  <li className="list-group-item">Link it to you ERP system</li>
                  <li className="list-group-item">Get live feedback from brand community</li>
                  <li className="list-group-item">Detect Counterfieted product and avoid huge lost</li>
                </ul>
                <button type="button" className="btn btn-primary pull-right">Sign in</button>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="panel panel-info">
              <div className="panel-heading">Sign in and join the community</div>
              <div className="panel-body">
                <ul className="list-group">
                  <li className="list-group-item">Give your own feedback</li>
                  <li className="list-group-item">Share information with the community</li>
                  <li className="list-group-item">Contact your favorite brand Manufacturer</li>
                  <li className="list-group-item">Help fight Counterfieted products</li>
                </ul>
                <button type="button" className="btn btn-primary pull-right">Sign in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

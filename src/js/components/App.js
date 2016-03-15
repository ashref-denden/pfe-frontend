import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
      <div className="row search">
        <div className="col-sm-12" >
          <h1>HI reflux</h1>
        </div>
      </div>
      <div className="row search">
        <div className="col-sm-12" >
          <form role="form">
            <div className="input-group">
              <input type="text" class="form-control input-sm"/>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

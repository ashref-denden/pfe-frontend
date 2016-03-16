import React from 'react';

export default class ProductCheckInput extends React.Component {
  render() {
    return (
      <div className="row">
        <form className="form-group" role="form">
          <div className="col-sm-10 col">
            <input type="text" className="form-control" placeholder="Check your product authticity"></input>
          </div>
          <div className="col-sm-2 col">
            <button type="button" className="btn btn-primary" onClick={this.check}>Check</button>
          </div>
        </form>
      </div>
    );
  }

  check() {

  }
}

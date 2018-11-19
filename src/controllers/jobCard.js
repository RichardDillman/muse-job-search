import React from 'react';

class JobCard extends React.Component {
  dateDiff = (published_date) => {		
    const diff = new Date() - new Date(published_date);		
    const days = Math.floor(diff / 86400000);
    return days > 0 ? `${days} days ago.` : 'today.';
  }

  render() {
    return (
      <div className="col-md-3">
        <div className="card">
          <h5 className="card-header">
            {this.props.company}
          </h5>
          <div className="card-body">
            <p className="text-primary">{this.props.name}</p>
            <p className="card-text">
              {this.props.locations.map(item => item.name).join(', ')}
            </p>
            <p className="card-text">
              <small>Posted {this.dateDiff(this.props.date)}</small>
            </p>
          </div>
          <div className="card-footer text-right">
            <button type="button"
              onClick={this.props.action.bind(this.props.name, this.props.link, this.props.company, this.props.contents)}
              className="btn btn-primary btn-sm"
              data-toggle="modal">details</button>
          </div>
        </div>
      </div>
    );
  }
}

export default JobCard;
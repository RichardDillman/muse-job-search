import React from 'react';

class Pagination extends React.Component {
  
  render() {
    console.log('props', this.props);
    const current = this.props.current;
    const total = this.props.total;
    const next = current < total ? current + 1 : null;
    const previous = current > 0 ? current - 1 : null;
    const getpages = pg => {
      console.log('GETPAGE', pg);
      this.props.action(pg);
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <nav className="pagination-sm">
            <ul className="pagination">
              <li className="page-item">
                <button className={`btn page-link${previous ? '' : ' disabled'}`} href="#" onClick={previous && getpages.bind(this, previous)}>Previous</button>
              </li>
              <li className="page-item">
                <button className="btn btn-sm btn-primary disabled" href="#">{current}</button>
              </li>
              <li className="page-item">
                <button className={`btn page-link`} href="#" onClick={getpages.bind(this, current + 1)}>{current + 1}</button>
              </li>
              <li className="page-item">
                <button className={`btn page-link`} href="#" onClick={getpages.bind(this, current + 2)}>{current + 2}</button>
              </li>
              <li className="page-item">
                <button className={`btn page-link`} href="#" onClick={getpages.bind(this, current + 3)}>{current + 3}</button>
              </li>
              <li className="page-item">
                <button className={`btn page-link${next ? '' : ' disabled'}`} href="#" onClick={next && getpages.bind(this, next)}>Next</button>
              </li>
            </ul>
            <small>Page {current} of {total} pages.</small>
          </nav>
        </div>
    </div>
    );
  }
}

export default Pagination;
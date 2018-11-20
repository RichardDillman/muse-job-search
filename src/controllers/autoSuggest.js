import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

class AutoComplete extends React.Component {
  state = {
    multiple: true
  };

  render() {
    const {multiple} = this.state;

    return (
      <div className="col-md-3">
        <label>{this.props.name}</label>
        <Typeahead
          labelKey="foobar"
          multiple={multiple}
          options={this.props.list}
          placeholder={this.props.placeHolder}
          onChange={this.props.action.bind(this.props.selected)}
        />
      </div>
    );
  }
}

export default AutoComplete;

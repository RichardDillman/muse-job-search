import React from 'react';
import Modal from 'react-bootstrap4-modal';

class BootstrapModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
    };
  }

  render() {
    return (
      <Modal visible={this.props.showModal} onClickBackdrop={this.props.close}>
        <div className="modal-header">
          <h5 className="modal-title">
          {this.props.title}
          <br />
          <a className="text-primary" href={this.props.link}>{this.props.company}</a>
          </h5>
        </div>
        <div className="modal-body" dangerouslySetInnerHTML={ { __html: this.props.details } }></div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={this.props.close}>
            Dismiss
          </button>
        </div>
      </Modal>
    );
  }
}

export default BootstrapModal;
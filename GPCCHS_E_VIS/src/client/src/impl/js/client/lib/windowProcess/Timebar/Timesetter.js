import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Timesetter.css';
import TimesetterFields from './TimesetterFields';

export default class Timesetter extends Component {

  static propTypes = {
    updateCursors: PropTypes.func.isRequired,
    toggleTimesetter: PropTypes.func.isRequired,
    visuWindow: PropTypes.object.isRequired,
    slideWindow: PropTypes.object.isRequired,
    timebarMode: PropTypes.string.isRequired,
    cursor: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
  }

  state = {
    errorMessages: [],
    showModal: true,
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp = (e) => {
    if (e.keyCode === 27) this.props.toggleTimesetter();
  }

  onChangeAction = (visuWindow, slideWindow, cursor) => {
    const { timebarId, updateCursors, timebarMode } = this.props;
    const errorMessages = [];
    switch (cursor) {
      case 'lower':
        if (visuWindow.lower > visuWindow.current) {
          errorMessages.push('Lower cursor must be before current cursor');
        }
        break;
      case 'upper':
        if (visuWindow.upper < visuWindow.current) {
          errorMessages.push('Upper cursor must be after current cursor');
        }
        break;
      case 'current':
        if (visuWindow.current < visuWindow.lower) {
          errorMessages.push('Current cursor must be after lower cursor');
        } else if (visuWindow.current > visuWindow.upper) {
          errorMessages.push('Current cursor must be before upper cursor');
        }
        break;
      case 'slideLower':
        if (timebarMode === 'Fixed') {
          if (slideWindow.lower < visuWindow.lower || slideWindow.lower > visuWindow.current) {
            errorMessages.push('Ext lower cursor must be between lower cursor and current cursor in Fixed mode');
          }
        }
        break;
      case 'slideUpper':
        if (timebarMode === 'Extensible') {
          if (slideWindow.upper < visuWindow.upper) {
            errorMessages.push('Ext upper cursor must be after upper cursor in Extensible mode');
          }
        } else if (timebarMode === 'Fixed') {
          if (slideWindow.upper < visuWindow.current || slideWindow.upper > visuWindow.upper) {
            errorMessages.push('Ext upper cursor must be between current cursor and upper cursor in Fixed mode');
          }
        }
        break;
      default:
        break;
    }

    this.setState({ errorMessages });

    if (!errorMessages.length) {
      updateCursors(
        timebarId,
        visuWindow,
        slideWindow
      );
    }
  }

  onClose = () => {
    this.setState({ showModal: false });
    setTimeout(() => this.props.toggleTimesetter(), 500);
  }

  render() {
    const { visuWindow, cursor, slideWindow } = this.props;
    const { errorMessages } = this.state;

    return (
      <div className="modal-container">
        <Modal show={this.state.showModal} onHide={this.onClose}>
          <Modal.Header>
            <Modal.Title>Manual setter</Modal.Title>
            <button
              className={classnames(
                'btn-sm',
                'btn',
                'btn-danger',
                'btn-close'
              )}
              onClick={this.onClose}
            >x</button>
          </Modal.Header>
          <Modal.Body>
            {errorMessages.map(x => <p className={classnames('text-danger', styles.errorMessage)}>{x}</p>)}
            {
              ['slideLower', 'lower', 'current', 'upper', 'slideUpper'].map((x, i) => {
                let ms;
                if (visuWindow[x]) {
                  ms = visuWindow[x];
                } else if (x === 'slideLower') {
                  ms = slideWindow.lower;
                } else if (x === 'slideUpper') {
                  ms = slideWindow.upper;
                }

                let disabled = cursor !== 'all';
                if (x === cursor) {
                  disabled = false;
                }

                return (
                  <TimesetterFields
                    key={i}
                    value={x}
                    disabled={disabled}
                    ms={ms}
                    visuWindow={visuWindow}
                    slideWindow={slideWindow}
                    onChange={this.onChangeAction}
                  />
                );
              })
            }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

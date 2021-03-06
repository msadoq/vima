// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import Continuous from './icons/continuous';
import Dashed from './icons/dashed';
import Doted from './icons/doted';
import Square from './icons/square';
import Dot from './icons/dot';
import Triangle from './icons/triangle';
import None from './icons/none';
import styles from './SelectButton.css';

export default class SelectButton extends React.Component {
  static propTypes = {
    active: PropTypes.string.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    active: this.props.active,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      this.setState({
        active: nextProps.active,
      });
    }
  }

  changeActive = (e, label) => {
    this.setState({ active: label });
    e.target.blur();
    this.props.onChange(label);
  }

  render() {
    const { active } = this.state;
    const { buttons } = this.props;
    return (
      <ButtonGroup className={styles.root}>
        {buttons.map(button => (<Button
          key={button.label}
          bsStyle={(active === button.label) ? 'primary' : 'default'}
          bsSize="xsmall"
          onClick={e => this.changeActive(e, button.label)}
          className={styles.button}
        >
          {(button.icon === 'continuous') ? <Continuous /> : null}
          {(button.icon === 'dashed') ? <Dashed /> : null}
          {(button.icon === 'doted') ? <Doted /> : null}
          {(button.icon === 'square') ? <Square /> : null}
          {(button.icon === 'dot') ? <Dot /> : null}
          {(button.icon === 'triangle') ? <Triangle /> : null}
          {(button.icon === 'none') ? <None /> : null}
          {(button.icon === 'alignLeft') ? <Glyphicon glyph="align-left" /> : null}
          {(button.icon === 'alignCenter') ? <Glyphicon glyph="align-center" /> : null}
          {(button.icon === 'alignRight') ? <Glyphicon glyph="align-right" /> : null}
        </Button>))}
      </ButtonGroup>
    );
  }
}

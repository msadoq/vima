import React, { PropTypes } from 'react';
import { TwitterPicker } from 'react-color';
import { Button } from 'react-bootstrap';
import None from './icons/none';
import styles from './ColorPicker.css';
import { colors as initialColors } from '../../common/colors';

export default class ColorPicker extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    colors: PropTypes.array,
    width: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    width: 276
  }

  state = { display: false, color: this.props.color || '#FFF' };

  componentWillReceiveProps(nextProps) {
    if (nextProps.color !== this.props.color) {
      this.setState({
        color: nextProps.color
      });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ display: !this.state.display });
  }

  handleClose = () => {
    this.setState({
      display: false
    });
  }

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
    this.props.onChange(this.state.color);
  }
  render() {
    const { color } = this.state;
    const { width, colors = initialColors } = this.props;

    return (
      <div className={styles.root}>
        <Button
          style={{ backgroundColor: color }}
          bsSize="xsmall"
          onClick={this.handleClick}
        ><None /></Button>
        {this.state.display &&
          <div className={styles.popover}>
            <div className={styles.cover} onClick={this.handleClose} />
            <TwitterPicker
              onChangeComplete={this.handleChangeComplete}
              color={color}
              colors={colors}
              width={width}
            />
          </div>}
      </div>
    );
  }
}
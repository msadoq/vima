import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import styles from './Help.css';

export default class HelpComponent extends Component {

  render() {
    return (
      <div className={styles.help}>
        <Col xs={4}>
          <h2 className={styles.subTitle}>Timebar</h2>
          <p className={styles.para}>
            <br />
            <b>Wheel actions</b><br /><br />
            <kbd>(ctrl/cmd)</kbd> + <kbd>wheel</kbd> Shrink / enlarge viewport.<br />
            <kbd>(ctrl/cmd)</kbd> + <kbd>alt</kbd> + <kbd>wheel</kbd>&nbsp;
            Move cursors together (homothety).<br />
          </p>
          <p className={styles.para}>
            <br />
            <b>Timebar Shortcuts</b><br /><br />
            <kbd>x</kbd> Move lower cursor on cursor position.<br />
            <kbd>c</kbd> Move ext lower cursor on cursor position.<br />
            <kbd>v</kbd> Move current cursor on cursor position.<br />
            <kbd>b</kbd> Move ext upper cursor on cursor position.<br />
            <kbd>n</kbd> Move upper cursor on cursor position.<br />
          </p>
          <p className={styles.para}>
            <br />
            <b>Time navigation</b><br /><br />
            Two ways to navigate through time:<br />
            - By dragging the visu window out of the viewport<br />
            - By dragging on the time scale (bellow the timebar)<br />
          </p>
        </Col>
        <Col xs={4} xsOffset={1}>
          <h2 className={styles.subTitle}>Page</h2>
          <p className={styles.para}>
            <br />
            <b>Views</b><br /><br />
            <kbd>(ctrl/cmd)</kbd> + <kbd>e</kbd> Collapse / expand hovered view<br />
          </p>
        </Col>
      </div>
    );
  }
}

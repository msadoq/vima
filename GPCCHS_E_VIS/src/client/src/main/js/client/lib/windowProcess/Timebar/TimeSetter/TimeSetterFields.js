// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in
//  windowProcess/Timebar
// END-HISTORY
// ====================================================================

import moment from 'moment';
import classnames from 'classnames';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _memoize from 'lodash/memoize';
import styles from './TimeSetter.css';

export default class TimeSetterFields extends PureComponent {

  static propTypes = {
    ms: PropTypes.number.isRequired,
    cursor: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    undisplayed: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  componentDidUpdate() {
    dateToArray(moment(this.props.ms)).forEach((x) => {
      this[`${x[0]}El`].value = x[1];
    });
  }

  changeAttr = (a, e) => {
    const { ms } = this.props;
    let attrVal = parseInt(e.currentTarget.value, 10);

    // UI month 1 equals moment month 0
    if (a === 'months') attrVal -= 1;

    // Fields validation
    if (a === 'milliseconds' && (attrVal < 0 || attrVal > 999)) {
      attrVal = 0;
    } else if (['seconds', 'minutes'].includes(a) && (attrVal < 0 || attrVal > 59)) {
      attrVal = 0;
    } else if (a === 'hours' && (attrVal < 0 || attrVal > 23)) {
      attrVal = 1;
    } else if (a === 'date' && (attrVal < 1 || attrVal > 31)) {
      attrVal = 1;
    } else if (a === 'months' && (attrVal < 0 || attrVal > 11)) {
      attrVal = 0;
    }

    const date = moment(ms);
    date.set(a, attrVal);

    this.props.onChange(date.toDate().getTime(), this.props.cursor);
  }

  changeAttrVal = _memoize(v => e => this.changeAttr(v, e));

  render() {
    const {
      ms,
      cursor,
      disabled,
      undisplayed,
    } = this.props;
    const arr = dateToArray(moment(ms));
    let valueText;
    if (cursor === 'slideLower') {
      valueText = 'Ext lower cursor';
    } else if (cursor === 'slideUpper') {
      valueText = 'Ext upper cursor';
    } else {
      valueText = `${cursor} cursor`;
    }

    return (
      <div className={styles.fieldsContainer}>
        <div
          style={{ width: '100%' }}
        >
          <b
            className={classnames(
              'text-capitalize',
              styles.formLabel,
              { [styles[`formLabel${cursor}`]]: !disabled }
            )}
          >
            {valueText}
          </b>
          <b>{undisplayed ? ' - hidden' : ''}</b>
        </div>
        {
          arr.map(x =>
            <div key={x[0]} className={styles.inputDiv}>
              <input
                key={x[0]}
                ref={(el) => { this[`${x[0]}El`] = el; }}
                className={classnames('form-control', styles.input, styles[`input_${x[0]}`])}
                defaultValue={x[1]}
                disabled={disabled}
                onClick={this.changeAttrVal(x[0])}
                onBlur={this.changeAttrVal(x[0])}
              />
              {['year', 'months'].find(a => a === x[0]) && <span>-</span>}
              {['hours', 'minutes'].find(a => a === x[0]) && <span>:</span>}
              {x[0] === 'seconds' && <span>.</span>}
            </div>
          )
        }
      </div>
    );
  }
}

const formats = {
  year: 'YYYY',
  months: 'MM',
  date: 'DD',
  hours: 'HH',
  minutes: 'mm',
  seconds: 'ss',
  milliseconds: 'SSS',
};

function dateToArray(m) {
  return [
    ['year', m.format(formats.year)],
    ['months', m.format(formats.months)],
    ['date', m.format(formats.date)],
    ['hours', m.format(formats.hours)],
    ['minutes', m.format(formats.minutes)],
    ['seconds', m.format(formats.seconds)],
    ['milliseconds', m.format(formats.milliseconds)],
  ];
}

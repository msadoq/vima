import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import _isObject from 'lodash/isObject';
import classnames from 'classnames';
import {
  Panel,
  Button,
} from 'react-bootstrap';
import Perf from 'react-dom/lib/ReactPerf';
import { get } from 'common/parameters';
import getLogger from 'common/log';
import { HEALTH_STATUS_HEALTHY, HEALTH_STATUS_WARNING, HEALTH_STATUS_CRITICAL } from '../../../constants';
import styles from './Performance.css';
import * as constants from '../../../viewManager/constants';

const logger = getLogger('Performance');

const getStyle = (status) => {
  switch (status) {
    case HEALTH_STATUS_CRITICAL:
      return classnames(styles.bull, styles.alert);
    case HEALTH_STATUS_WARNING:
      return classnames(styles.bull, styles.warning);
    default:
      return classnames(styles.bull, styles.healthy);
  }
};

export default class Performance extends Component {
  static propTypes = {
    lastPubSubTimestamp: PropTypes.number,
    dc: PropTypes.string,
    hss: PropTypes.string,
    main: PropTypes.string,
    window: PropTypes.string,
    viewInfo: PropTypes.shape({
      [constants.VM_VIEW_DYNAMIC]: PropTypes.object,
      [constants.VM_VIEW_TEXT]: PropTypes.object,
      [constants.VM_VIEW_PLOT]: PropTypes.object,
    }),
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    timebarUuid: PropTypes.string.isRequired,
  };

  static defaultProps = {
    lastPubSubTimestamp: null,
    dc: HEALTH_STATUS_HEALTHY,
    hss: HEALTH_STATUS_HEALTHY,
    main: HEALTH_STATUS_HEALTHY,
    window: HEALTH_STATUS_HEALTHY,
    viewInfo: {
      [constants.VM_VIEW_DYNAMIC]: {},
      [constants.VM_VIEW_TEXT]: {},
      [constants.VM_VIEW_PLOT]: {},
    },
  };

  printReactWastedRenders = () => {
    this.props.play(this.props.timebarUuid);
    Perf.start();
    setTimeout(() => {
      Perf.stop();
      // eslint-disable-next-line no-console
      console.log('WASTED');
      Perf.printWasted();
      // eslint-disable-next-line no-console
      console.log('INCLUSIVE');
      Perf.printInclusive();
      // eslint-disable-next-line no-console
      console.log('EXCLUSIVE');
      Perf.printExclusive();
      this.props.pause(this.props.timebarUuid);
    }, get('ORCHESTRATION_FREQUENCY'));
  }

  profileTick = () => {
    this.props.play(this.props.timebarUuid);
    _get(console, ['profile'])('tick');
    setTimeout(() => {
      _get(console, ['profileEnd'])('tick');
      this.props.pause(this.props.timebarUuid);
    }, get('ORCHESTRATION_FREQUENCY') * 2 * 3);
  }

  render() {
    logger.debug('render');
    const {
      hss,
      dc,
      main,
      window,
      lastPubSubTimestamp,
      viewInfo,
    } = this.props;

    const dcStyle = getStyle(dc);
    const hssStyle = getStyle(hss);
    const mainStyle = getStyle(main);
    const windowStyle = getStyle(window);

    const pubSubStyle = lastPubSubTimestamp
      ? classnames(styles.bull, styles.healthy)
      : classnames(styles.bull, styles.idle);

    let last = '';
    if (lastPubSubTimestamp) {
      last = (
        <span>
          {' '}
          <span>{moment(lastPubSubTimestamp).format('D MMMM YYYY HH[:]mm')}</span>
          <span className={styles.seconds}>{moment(lastPubSubTimestamp).format('[:]ss[.]SSS')}</span>
        </span>
      );
    }
    const plotPts = _reduce(viewInfo[constants.VM_VIEW_PLOT], (acc, v, idx) => {
      if (_isObject(v)) {
        acc.push((<li key={'plot'.concat(idx)}>{v.title}: {v.nbPt}</li>));
      }
      return acc;
    }, []);
    const textPts = _reduce(viewInfo[constants.VM_VIEW_TEXT], (acc, v, idx) => {
      if (_isObject(v)) {
        acc.push((<li key={'text'.concat(idx)}>{v.title}: {v.nbPt}</li>));
      }
      return acc;
    }, []);

    return (
      <div>
        <Panel header={<h3>Health</h3>}>
          <div title="Data Consumer daemon health status">
            <span className={dcStyle}>•</span> DC
          </div>
          <div title="Cache daemon health status">
            <span className={hssStyle}>•</span> HSS
          </div>
          <div title="Main application thread health status">
            <span className={mainStyle}>•</span> MAIN
          </div>
          <div title="Current window health status">
            <span className={windowStyle}>•</span> WINDOW
          </div>
        </Panel>
        <Panel header={<h3>Pub/sub incoming data</h3>}>
          <div title="Pub/sub receiving state">
            {last}
          </div>
          <span className={pubSubStyle}>•</span> PUB/SUB
        </Panel>
        <Panel header={<h3>Numbers</h3>}>
          <div>Number of views:
          <ul>
            <li key="v1">Plot Views: {Object.keys(viewInfo[constants.VM_VIEW_PLOT]).length - 1}</li>
            <li key="v2">Text Views: {Object.keys(viewInfo[constants.VM_VIEW_TEXT]).length - 1}</li>
            <li key="v3">Dynamic View: {viewInfo[constants.VM_VIEW_DYNAMIC].all}</li>
          </ul>
          </div>
          <div>Number of points:
            <ul> Plot Views:
              <ul>{plotPts}</ul>
            </ul>
            <ul> Text Views:
              <ul>{textPts}</ul>
            </ul>
          </div>
        </Panel>
        <Button
          bsStyle="primary"
          block
          onClick={this.printReactWastedRenders}
          type="button"
        >
        Print React wasted renderers
        </Button>
        <Button
          bsStyle="primary"
          block
          onClick={this.profileTick}
          type="button"
        >
        Profile tick
        </Button>
      </div>
    );
  }
}

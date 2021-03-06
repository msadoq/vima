// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6829 : 30/06/2017 : Grizzly parametric first draft 1.0
// VERSION : 1.1.2 : DM : #6829 : 03/07/2017 : Grizzly Parametric, second draft, X axes top/bottom,
//  Y axes right/left. 1.1
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : DM : #6830 : 24/07/2017 : Reproducing styles memoization for Grizzly
//  Parametric.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6835 : 06/09/2017 : Restored perfOutput for grizzly parametric .
// VERSION : 1.1.2 : DM : #6835 : 08/09/2017 : Simplified style for canvas divs and tooltip divs,
//  calculated only once in main Chart component.
// VERSION : 1.1.2 : DM : #6835 : 14/09/2017 : Added support for alsso functionnality in both
//  Grizzly and GrizzlyParametric. Fixed few bugs. Added a fake PlotViewParametricFake file to test
//  GrizzlyParametric.
// VERSION : 1.1.2 : FA : #7755 : 18/09/2017 : When pointStyle, lineStyle or other property is
//  changed on EP, curves get updated automatically.
// VERSION : 1.1.2 : FA : #7814 : 19/09/2017 : GrizzlyParametric now also works with indexes and
//  data.
// VERSION : 2.0.0 : DM : #6835 : 20/09/2017 : Fixed lint error in Grizzly and GrizzlypParametric.
// VERSION : 2.0.0 : DM : #6835 : 09/10/2017 : PlotView always renders GrizzlyParametric with one x
//  axis. Tooltip reviewed. Current cursor reviewed for parametric and basic.
// VERSION : 2.0.0 : FA : #8045 : 06/11/2017 : PlotView can draw string parameters, and a defaultY
//  property can be set.
// VERSION : 2.0.0 : FA : #9028 : 07/11/2017 : refactor Line Canvas function + snapshots
// VERSION : 2.0.0 : FA : #9028 : 09/11/2017 : refactor Line Canvas function // Test // Fix
// VERSION : 2.0.0 : DM : #6818 : 16/11/2017 : cleanup PropTypes declaration / tests / debounce
//  linesListener action on zoom & pan
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import styles from './GrizzlyChart.css';
import { drawLinesCanvas, shouldRenderComponent } from './LineCanvasCommon';
import { lineType, divStyleType } from './types';

export default class LinesCanvas extends Component {

  static propTypes = {
    updateLabelPosition: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    showLabelsX: PropTypes.bool,
    showLabelsY: PropTypes.bool,
    perfOutput: PropTypes.bool,
    indexes: PropTypes.objectOf(PropTypes.shape).isRequired,
    current: PropTypes.number.isRequired,
    lines: PropTypes.arrayOf(lineType.isRequired).isRequired,
    divStyle: divStyleType.isRequired,
    parametric: PropTypes.bool.isRequired,
    constants: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    displayMode: PropTypes.number.isRequired,
  };

  static defaultProps = {
    showLabelsX: false,
    showLabelsY: false,
    perfOutput: false,
  };

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    const attrs = ['yAxesAt', 'perfOutput', 'xScale', 'yScale', 'showLabelsX', 'showLabelsY',
      'yScale', 'indexes', 'divStyle', 'parametric', 'current', 'constants', 'displayMode'];

    const { shouldRender, linesObject } = shouldRenderComponent(
      attrs,
      nextProps,
      this.linesObject,
      this.props
    );
    this.linesObject = linesObject;
    return shouldRender;
  }

  componentDidUpdate() {
    this.draw();
  }

  draw = () => {
    const {
      perfOutput,
      lines,
      updateLabelPosition,
      showLabelsX,
      showLabelsY,
      yScale,
      xScale,
      indexes,
      current,
      divStyle,
      constants,
      displayMode,
    } = this.props;

    const ctx = this.el.getContext('2d');

    const parametric = this.props.lines[0].xAxis.id !== 'time';

    drawLinesCanvas(
      perfOutput,
      lines,
      updateLabelPosition,
      showLabelsX,
      showLabelsY,
      yScale,
      xScale,
      indexes,
      current,
      parametric,
      divStyle,
      ctx,
      constants,
      displayMode
    );
  };

  assignEl = (el) => { this.el = el; };

  render() {
    const {
      divStyle,
    } = this.props;

    return (
      <ErrorBoundary>
        <canvas
          ref={this.assignEl}
          height={divStyle.height}
          width={divStyle.width}
          className={styles.canvas}
          style={divStyle}
        />
      </ErrorBoundary>
    );
  }
}

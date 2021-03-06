// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6829 : 30/06/2017 : Grizzly parametric first draft 1.0
// VERSION : 1.1.2 : DM : #6829 : 03/07/2017 : Grizzly Parametric, second draft, X axes top/bottom,
//  Y axes right/left. 1.1
// VERSION : 1.1.2 : DM : #6829 : 04/07/2017 : Grizzly parametric version 1.3 : magnet points.
// VERSION : 1.1.2 : DM : #6829 : 06/07/2017 : Added format X and Y to tooltip. Grizzly Parametric.
// VERSION : 2.0.0 : DM : #6835 : 09/10/2017 : PlotView always renders GrizzlyParametric with one x
//  axis. Tooltip reviewed. Current cursor reviewed for parametric and basic.
// VERSION : 2.0.0 : DM : #6835 : 20/10/2017 : Fix problem with PlotView's grid not updating.
// VERSION : 2.0.0 : FA : #9028 : 10/11/2017 : refactor PlotView Axes // Test
// VERSION : 2.0.0 : DM : #6818 : 16/11/2017 : cleanup PropTypes declaration / tests / debounce
//  linesListener action on zoom & pan
// VERSION : 2.0.0 : FA : ISIS-FT-2280 : 06/12/2017 : ergonomie plotView VIMA // afficher la grille
//  (celle-ci ne s'affiche pas malgre un etat a ON)
// VERSION : 2.0.0.2 : FA : #11609 : 20/04/2018 : correction plot view editeur unit + label(unit) +
//  test (cherry picked from commit 3c9fde0)
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import { select } from 'd3-selection';
import { range } from 'd3-array';
import { format as d3Format } from 'd3-format';
import { axisLeft, axisRight } from 'd3-axis';
import { timeFormat } from 'd3-time-format';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { levelsRules, getZoomLevel } from 'windowProcess/common/timeFormats';
import { getStringByValue } from 'windowProcess/common/stringToIntegerMapSingleton';

import styles from './GrizzlyChart.css';
import Axis from './Axis';
import { lineType, labelStyleType } from './types';


export default class YAxis extends Component {
  static propTypes = {
    getLabelPosition: PropTypes.func.isRequired,
    axisId: PropTypes.string.isRequired,
    xAxesAt: PropTypes.string,
    yAxesAt: PropTypes.string,
    logarithmic: PropTypes.bool,
    index: PropTypes.number.isRequired,
    scale: PropTypes.func.isRequired,
    extents: PropTypes.arrayOf(PropTypes.number).isRequired,
    height: PropTypes.number.isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    lines: PropTypes.arrayOf(lineType.isRequired).isRequired,
    showLabels: PropTypes.bool,
    showTicks: PropTypes.bool,
    autoTick: PropTypes.bool,
    tickStep: PropTypes.number,
    showGrid: PropTypes.bool,
    gridStyle: PropTypes.string,
    gridSize: PropTypes.number,
    label: PropTypes.string.isRequired,
    format: PropTypes.string,
    formatAsDate: PropTypes.bool,
    formatAsString: PropTypes.bool,
    stringField: PropTypes.string,
    labelStyle: labelStyleType.isRequired,
    xAxisHeight: PropTypes.number.isRequired,
    side: PropTypes.number.isRequired,
    constants: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    logarithmic: false,
    showLabels: false,
    showTicks: true,
    showGrid: true,
    gridStyle: 'Continuous',
    xAxesAt: 'bottom',
    format: '.2f',
    yAxesAt: 'left',
    gridSize: 1,
    tickStep: 8,
    autoTick: false,
    constants: [],
    labelStyle: {
      color: '#333333',
      bgColor: '#FFFFFF',
      align: 'center',
      font: 'Arial',
      italic: false,
      bold: false,
      underline: false,
      size: 11,
    },
    formatAsDate: false,
    formatAsString: false,
    stringField: null,
  };

  componentDidMount() {
    this.draw();
    this.drawLabel();
    this.drawLinesLabel();
    this.drawConstantsLabel();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = nextProps.updateAxis;
    const attrs = ['yAxesAt', 'top', 'height', 'yAxisWidth', 'margin', 'chartWidth',
      'scale', 'autoTick', 'tickStep', 'format', 'gridStyle', 'gridSize', 'showGrid', 'constants'];
    for (let i = 0; i < attrs.length; i += 1) {
      if (nextProps[attrs[i]] !== this.props[attrs[i]]) {
        shouldRender = true;
      }
    }

    const linesIds = nextProps.lines.map(l => l.id).join('-');
    if (!this.linesIds || linesIds !== this.linesIds) {
      shouldRender = true;
    }
    this.linesIds = linesIds;

    // update line label refs's style attribute
    if (!shouldRender) {
      this.drawLinesLabel();
      this.drawConstantsLabel();
    }

    return shouldRender;
  }

  componentDidUpdate() {
    this.draw();
    this.drawLabel();
    this.drawLinesLabel();
    this.drawConstantsLabel();
  }

  ticksXOffset = 8;

  axisDidDraw = () => {
    const {
      gridSize,
    } = this.props;
    select(this.svgAxisEl).selectAll('line').attr('stroke-width', gridSize);
  };

  drawConstantsLabel = () => {
    const {
      constants,
      scale,
      yAxisWidth,
      yAxesAt,
    } = this.props;

    constants.forEach((constant) => {
      const el = this[`label-${constant.id}-el`];
      if (el) {
        if (!constant.showConstant || !constant.showLabel) {
          el.setAttribute('style', 'display:none;');
        } else {
          let style = `background:${constant.style.color || '#222222'};top:${scale(constant.value)}px;`;
          if (yAxesAt === 'left') {
            style += `transform: translate(-102%, -50%);left: ${yAxisWidth - 8}px;`;
          } else {
            style += `transform: translate(102%, -50%);right: ${yAxisWidth - 8}px;`;
          }
          el.setAttribute('style', style);
        }
      }
    });
  };

  drawLinesLabel = () => {
    const {
      lines,
      axisId,
      getLabelPosition,
      showLabels,
    } = this.props;
    if (!showLabels || !lines) {
      return;
    }

    const positions = getLabelPosition(axisId);
    lines.forEach((line) => {
      const el = this[`label-${line.id}-el`];
      this.drawLineLabel(line, positions, el);
    });
  };

  /**
   * @param line
   * @param positions
   * @param el
   */
  drawLineLabel = (line, positions, el) => {
    const {
      yAxisWidth,
      yAxesAt,
    } = this.props;

    let linePosition = positions.find(pos => typeof pos[line.id] !== 'undefined');
    linePosition = linePosition ? linePosition[line.id] : null;
    if (!linePosition || (linePosition.y === null && el)) {
      el.setAttribute('style', 'display:none;');
    } else if (el) {
      let style = `background:${line.fill || '#222222'};top:${linePosition.y}px;`;
      if (yAxesAt === 'left') {
        style += `transform: translate(-102%, -50%);left: ${yAxisWidth - 8}px;`;
      } else {
        style += `transform: translate(102%, -50%);right: ${yAxisWidth - 8}px;`;
      }
      el.setAttribute('style', style);
    }
  };

  drawLabel = () => {
    const {
      labelStyle,
      height,
      chartWidth,
      index,
      yAxesAt,
    } = this.props;

    let style = 'position:absolute;';
    let transform = '';
    if (yAxesAt === 'left') {
      transform += 'transform: rotate(90deg)';
      style += 'left: 0px;';
    } else {
      transform += 'transform: rotate(-90deg)';
      if (index === 0) {
        style += `left: ${chartWidth}px;`;
      } else {
        style += 'right: 0px;';
      }
    }
    style += `font-size:${labelStyle.size}px;`;
    style += `font-family:${labelStyle.font};`;
    style += `color:${labelStyle.color};`;
    style += `background:${labelStyle.bgColor};`;
    if (labelStyle.align === 'left') {
      style += 'top: 20px;';
    } else if (labelStyle.align === 'right') {
      style += `top: ${height - 10}px;`;
      if (yAxesAt === 'left') {
        transform += ' translateX(-70%)';
      } else {
        transform += ' translateX(70%)';
      }
    } else if (labelStyle.align === 'center') {
      style += `top: ${height / 2}px;`;
    }
    transform += ';';
    this.labelEl.setAttribute('style', `${style};${transform}`);
  };

  draw = () => {
    const {
      yAxesAt,
      yAxisWidth,
      scale,
      chartWidth,
      index,
      showTicks,
      tickStep,
      autoTick,
      format,
      showGrid,
      gridStyle,
      xAxesAt,
      logarithmic,
      extents,
      formatAsDate,
      formatAsString,
      stringField,
    } = this.props;

    let tickFormat = () => null;
    if (showTicks) {
      if (formatAsString) {
        tickFormat = d => getStringByValue(stringField, d);
      } else if (formatAsDate) {
        tickFormat = this.memoizeTickFormat(extents[1] - extents[0]);
      } else {
        tickFormat = this.memoizeFormatter(format);
      }
    }

    // if showGrid & master axis, axis must be wider
    const tickSize = index === 0 && showGrid ?
      chartWidth + this.ticksXOffset : this.ticksXOffset;

    let translateX;
    if (yAxesAt === 'left') {
      translateX = index === 0 && showGrid ?
        (chartWidth + yAxisWidth) : yAxisWidth;
    } else {
      translateX = index === 0 && showGrid ?
        -1 : 0;
    }

    let yAxisFunction;
    if (yAxesAt === 'left') {
      yAxisFunction = axisLeft(scale);
    } else {
      yAxisFunction = axisRight(scale);
    }

    if (logarithmic) {
      yAxisFunction = yAxisFunction
        .ticks(8);
    } else if (autoTick) {
      yAxisFunction = yAxisFunction
        .ticks(8);
    } else {
      const offset = extents[1] % tickStep;
      const tickValues = this.memoizeRange(
        `${extents[0]}-${extents[1]}-${tickStep}-${offset}`,
        (extents[0] - offset) + tickStep,
        (extents[1] - offset) + tickStep,
        tickStep
      );
      yAxisFunction = yAxisFunction
        .tickValues(tickValues);
    }

    yAxisFunction = yAxisFunction
      .tickSize(tickSize)
      .tickFormat(logarithmic ? d => d : tickFormat);

    const yMiniOffset = xAxesAt === 'top' ? 0 : -1;
    // style for <svg><g>
    let gStyle = '';
    if (yAxesAt === 'left') {
      gStyle += `transform: translate(${translateX}px, ${yMiniOffset}px);`;
    } else {
      gStyle += `transform: translate(${translateX}px, ${yMiniOffset}px);`;
    }

    this.svgAxisEl.innerHTML = '';
    const svgGroup = select(this.svgAxisEl)
      .append('g')
      .attr('style', gStyle)
      .attr('class', classnames(
        styles.yAxisGroup,
        {
          [styles[gridStyle]]: index === 0 && showGrid,
        }
      ));

    yAxisFunction(svgGroup);
    this.axisDidDraw();
  };

  assignEl = (el) => { this.svgAxisEl = el; };
  assignLabelEl = (el) => { this.labelEl = el; };

  memoizeFormatter = _memoize(f =>
    d => d3Format(f)(d)
  );

  memoizeStringFormatter = f => d => d3Format(f)(d);

  memoizeRange = _memoize((hash, lower, upper, step) =>
    range(lower, upper, step)
  );

  memoizeAssignRef = _memoize(lineId =>
    (el) => { this[`label-${lineId}-el`] = el; }
  );

  memoizeConstantsRef = _memoize(constantId =>
    (el) => { this[`label-${constantId}-el`] = el; }
  );

  memoizeTickFormat = _memoize(
    (ms) => {
      const zoomLevel = getZoomLevel(ms);
      const levelRule = levelsRules[zoomLevel];
      return timeFormat(levelRule.formatD3);
    }
  );

  render() {
    const {
      lines,
      showLabels,
      label,
      height,
      xAxisHeight,
      index,
      showGrid,
      chartWidth,
      yAxisWidth,
      labelStyle,
      margin,
      yAxesAt,
      xAxesAt,
      side,
      constants,
    } = this.props;

    return (
      <ErrorBoundary>
        <Axis
          direction="vertical"
          lines={lines}
          showLabels={showLabels}
          label={label}
          height={height}
          xAxisHeight={xAxisHeight}
          index={index}
          showGrid={showGrid}
          chartWidth={chartWidth}
          yAxisWidth={yAxisWidth}
          labelStyle={labelStyle}
          margin={margin}
          yAxesAt={yAxesAt}
          xAxesAt={xAxesAt}
          side={side}
          assignLabelEl={this.assignLabelEl}
          assignEl={this.assignEl}
          memoizeAssignRef={this.memoizeAssignRef}
          constants={constants}
          memoizeConstantsRef={this.memoizeConstantsRef}
        />
      </ErrorBoundary>
    );
  }
}

import React, { PropTypes, PureComponent } from 'react';
import _get from 'lodash/get';
import classnames from 'classnames';
import styles from './PlotView.css';

export default class Legend extends PureComponent {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggleShowLegend: PropTypes.func.isRequired,
    selectLine: PropTypes.func.isRequired,
    selectedLineName: PropTypes.string,
    yAxes: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
  }

  static defaultProps = {
    selectedLineName: null,
  }

  render() {
    const {
      yAxes,
      lines,
      show,
      selectLine,
      selectedLineName,
    } = this.props;

    const sortedAndValidAxes = yAxes
      .map((axis) => {
        const axisLines = lines
          .filter(line => _get(line, ['connectedDataY', 'axisId']) === axis.id);
        return {
          ...axis,
          lines: axisLines,
        };
      })
      .filter(axis => axis.lines.length > 0 && axis.showAxis);

    return (
      <div
        className={styles.plotLegend}
      >
        <button
          onClick={this.props.toggleShowLegend}
          className="btn-primary"
        >
          {show ? 'Hide legend' : 'Show legend'}
        </button>
        {
          show && sortedAndValidAxes.map(axis =>
            <div
              key={axis.id}
            >
              <h4 className={styles.plotLegendAxisName}>{axis.label}</h4>
              <div className={styles.plotLegendLegends}>
                {
                  axis.lines.map(line =>
                    <button
                      className={classnames(
                        selectedLineName === line.name ?
                        styles.selectedLegend : styles.legend,
                        'btn', 'btn-default', 'btn-xs'
                      )}
                      onClick={e => selectLine(e, line.name)}
                      key={line.name}
                    >
                      <span
                        className={styles.plotLegendColor}
                        style={{
                          background: _get(line, ['objectStyle', 'curveColor']) || '#222',
                        }}
                      />
                      <span
                        className={styles.plotLegendName}
                      >
                        {` : ${line.name}`}
                      </span>
                    </button>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
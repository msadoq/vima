/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import styles from '../../../commonEditor/Editor.css';
import Navbar from '../../../commonEditor/Navbar/Navbar';
import EntryPointTree from './EntryPointTree';
import EntryPointActions from '../../../commonEditor/EntryPoint/EntryPointActions';
import TextTabContainer from './TextTabContainer';

const newEntryPoint = {
  name: 'NewEntryPoint',
  connectedData: {}
};

export default class Editor extends Component {
  static propTypes = {
    // actions
    addEntryPoint: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,

    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.string.isRequired,
      entryPoints: PropTypes.array,
      links: PropTypes.array,
      defaultRatio: PropTypes.shape({
        length: PropTypes.number,
        width: PropTypes.number
      }),
      content: PropTypes.string.isRequired,
      titleStyle: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikeOut: PropTypes.bool,
        align: PropTypes.string,
        color: PropTypes.string
      })
    })
  };

  state = { currentDisplay: 0, search: '' };

  addEntryPoint = (values) => {
    const { addEntryPoint, viewId } = this.props;
    addEntryPoint(
      viewId,
      {
        ...newEntryPoint,
        ...values,
      }
    );
  }

  removeEntryPoint = (key) => {
    const { removeEntryPoint, viewId } = this.props;
    removeEntryPoint(viewId, key);
  }

  handleTextTitle = (newVal) => {
    const { updateTitle, viewId } = this.props;
    updateTitle(viewId, newVal);
  }

  handleTextTitleStyle = (label, newVal) => {
    const { configuration, updateTitleStyle, viewId } = this.props;
    updateTitleStyle(viewId, {
      ...configuration.titleStyle,
      [label]: newVal
    });
  }

  changeSearch = s => this.setState({ search: s });
  changeCurrentDisplay = id => this.setState({ currentDisplay: id });

  render() {
    const { currentDisplay, search } = this.state;
    const {
      closeEditor,
      updateTitleStyle,
      updateTitle,
      configuration: {
        entryPoints,
        title,
        titleStyle
      }
    } = this.props;

    return (
      <div className={styles.contentWrapper}>
        <Navbar
          currentDisplay={currentDisplay}
          items={['Entry Points', 'Text']}
          changeCurrentDisplay={this.changeCurrentDisplay}
          closeEditor={closeEditor}
        />
        <div className={styles.content}>
          {currentDisplay === 0 && <div>
            <EntryPointActions
              changeSearch={this.changeSearch}
              addEntryPoint={this.addEntryPoint}
            />
            <EntryPointTree
              entryPoints={entryPoints}
              search={search}
              remove={this.removeEntryPoint}
            />
          </div>}
          {currentDisplay === 1 && <TextTabContainer />}
        </div>
      </div>
    );
  }
}
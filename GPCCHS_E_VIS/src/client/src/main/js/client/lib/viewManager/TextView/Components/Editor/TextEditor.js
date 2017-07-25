import React, { Component, PropTypes } from 'react';
import styles from '../../../commonEditor/Editor.css';
import Navbar from '../../../commonEditor/Navbar/Navbar';
import EntryPointTree from './EntryPointTree';
import EntryPointActions from '../../../commonEditor/EntryPoint/EntryPointActions';
import TextTabContainer from './TextTabContainer';
import { Misc } from '../../../commonEditor/Misc';

const navBarItems = ['Entry Points', 'Text', 'Misc'];

export default class Editor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    tab: PropTypes.number,
    openModal: PropTypes.func.isRequired,
    updateViewTab: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    title: PropTypes.string,
    titleStyle: PropTypes.shape().isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,
    panels: PropTypes.shape({}).isRequired,
    entryPointsPanels: PropTypes.shape({}).isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    updateEditorSearch: PropTypes.func.isRequired,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
      content: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    tab: null,
    title: '',
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
      [label]: newVal,
    });
  }

  changeSearch = s => this.props.updateEditorSearch(s);

  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  }

  render() {
    const {
      openModal,
      tab,
      viewId,
      panels,
      titleStyle,
      title,
      entryPointsPanels,
      updateViewPanels,
      configuration: {
        entryPoints,
        search,
      },
    } = this.props;

    return (
      <div className={styles.contentWrapper}>
        <h4
          className="text-center mb10"
        >
          <span className="mr5 EditorVignette" style={{ background: titleStyle.bgColor }} />
          <b>{title}</b>
        </h4>
        <Navbar
          currentDisplay={tab === null ? 0 : tab}
          items={navBarItems}
          changeCurrentDisplay={this.changeCurrentDisplay}
        />
        <div className={styles.content}>
          {(tab === 0 || tab === null) && <div>
            <EntryPointActions
              changeSearch={this.changeSearch}
              openModal={openModal}
              viewId={viewId}
              viewType="TextView"
              search={search}
            />
            <EntryPointTree
              viewId={viewId}
              entryPoints={entryPoints}
              search={search}
              remove={this.removeEntryPoint}
              entryPointsPanels={entryPointsPanels}
              updateViewPanels={updateViewPanels}
            />
          </div>}
          {
            tab === 1 &&
            <TextTabContainer
              viewId={viewId}
              updateViewPanels={updateViewPanels}
              panels={panels}
            />
          }
          {tab === 2 &&
            <Misc
              updateViewPanels={updateViewPanels}
              viewId={viewId}
              panels={panels}
              openModal={openModal}
            />}
        </div>
      </div>
    );
  }
}

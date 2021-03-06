// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6129 : 31/05/2017 : add digital display feature and fix lint warnings
// VERSION : 1.1.2 : DM : #6785 : 06/06/2017 : Fix links in mimic view
// VERSION : 1.1.2 : DM : #6129 : 10/07/2017 : MimicView editor rc-collapse implementation + fixes
//  on Plot and Text editors too.
// VERSION : 1.1.2 : FA : #7256 : 25/07/2017 : Added top title in editor with colored vignette.
// VERSION : 1.1.2 : FA : #7145 : 27/07/2017 : Fix renderer crash when titleStyle is missing
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 23/08/2017 : On Plot/Text/Mimic/Dynamic editors: Save and
//  Reload buttons beneath the title.
// VERSION : 1.1.2 : FA : #7753 : 19/09/2017 : MimicTab editor component uses rc-collapse instead
//  of bootstrap collapse.
// VERSION : 2.0.0 : FA : #9494 : 01/12/2017 : Regression in View Editor ( domain ) // move
//  MimicView common components to dedicated folder
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : DM : #10790 : 27/02/2018 : merge R10dev P1 into bridge REVERT
// VERSION : 2.0.0.3 : FA : ISIS-FT-3086 : 15/05/2018 : editor's form bug on reintialize
// VERSION : 2.0.0.3 : FA : ISIS-FT-3086 : 30/05/2018 : editor's form bug on reintialize
// VERSION : 2.0.0.3 : FA : ISIS-FT-3174 : 30/05/2018 : disable background color on view header for
//  multisat handle
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import { Misc } from 'viewManager/commonEditor/Misc';
import styles from 'viewManager/commonEditor/Editor.css';
import MimicTabContainer from 'viewManager/MimicView/Components/Editor/MimicTabContainer';
import DataViewEntryPointsContainer from 'viewManager/commonEditor/EntryPoint/DataViewEntryPointsContainer';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

const navBarItems = ['Entry Points', 'Mimic', 'Misc'];

export default class Editor extends Component {
  static propTypes = {
    search: PropTypes.string,
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    // from container mapStateToProps
    title: PropTypes.string,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
    }).isRequired,
    panels: PropTypes.shape({}).isRequired,
    tab: PropTypes.number,
    // from container mapDispatchToProps
    openModal: PropTypes.func.isRequired,
    updateViewTab: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
  };
  static defaultProps = {
    tab: null,
    title: '',
    search: null,
  };
  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  };
  render() {
    const {
      openModal,
      tab,
      viewId,
      pageId,
      search,
      panels,
      title,
      updateViewPanels,
      configuration: {
        entryPoints,
      },
    } = this.props;

    return (
      <ErrorBoundary>
        <div className={styles.contentWrapper}>
          <h4
            className="text-center mb10"
          >
            <span className="mr5 EditorVignette" />
            <b>{title}</b>
          </h4>
          <ReloadAndSaveViewButtonsContainer viewId={viewId} />
          <Navbar
            currentDisplay={tab === null ? 0 : tab}
            items={navBarItems}
            changeCurrentDisplay={this.changeCurrentDisplay}
          />
          <div className={styles.content}>
            {(tab === 0 || tab === null) && <div>
              <DataViewEntryPointsContainer
                entryPoints={entryPoints}
                viewId={viewId}
                pageId={pageId}
                search={search}
                viewType={'MimicView'}
              />
            </div>}
            {
              tab === 1 &&
              <MimicTabContainer
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
      </ErrorBoundary>
    );
  }
}

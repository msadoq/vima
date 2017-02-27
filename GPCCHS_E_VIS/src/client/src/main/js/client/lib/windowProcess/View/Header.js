import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { v4 } from 'uuid';
import globalConstants from 'common/constants';

import styles from './Header.css';
import Modal from '../common/Modal';
import ChoosePage from './ChoosePage';
import { main } from '../ipc';

export default class Header extends PureComponent {
  static propTypes = {
    isViewsEditorOpen: PropTypes.bool.isRequired,
    configuration: PropTypes.shape({
      title: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      titleStyle: PropTypes.object,
    }),
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    oId: PropTypes.string.isRequired,
    absolutePath: PropTypes.string.isRequired,
    isModified: PropTypes.bool.isRequired,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    unmountAndRemove: PropTypes.func.isRequired,
    moveViewToPage: PropTypes.func.isRequired,
    windowPages: PropTypes.arrayOf(PropTypes.object).isRequired,
    collapseView: PropTypes.func.isRequired,
  };
  static defaultProps = {
    configuration: {
      title: 'Untitled',
    },
  };
  static contextTypes = {
    windowId: PropTypes.string,
    focusedPageId: PropTypes.string,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      choosePage: false,
      pageTitles: [],
      // errorMessage: null,
    };
  }

  onDropDownClick = (key) => {
    const {
      viewId,
      type,
      configuration,
      isViewsEditorOpen,
      openEditor,
      closeEditor,
      unmountAndRemove,
      windowPages,
      collapseView,
      collapsed,
    } = this.props;

    const {
      focusedPageId,
    } = this.context;

    switch (key) {
      case 'editor': {
        if (isViewsEditorOpen && closeEditor) {
          closeEditor();
        } else if (!isViewsEditorOpen && openEditor) {
          openEditor(viewId, type, configuration);
        }
        break;
      }
      case 'move': {
        const pageTitles = windowPages.reduce((list, page) => (
          [...list, { title: page.title, id: page.pageId }]
        ), []);
        pageTitles.push({ title: 'New page', id: v4() });
        this.setState({ pageTitles, choosePage: true });
        break;
      }
      case 'close': {
        unmountAndRemove(viewId);
        if (isViewsEditorOpen && closeEditor) {
          closeEditor();
        }
        break;
      }
      case 'collapse': {
        collapseView(focusedPageId, viewId, !collapsed);
        break;
      }
      case 'save':
        this.save();
        break;
      case 'saveAs':
        main.message(globalConstants.IPC_METHOD_SAVE_VIEW, { viewId });
        break;
      case 'reload':
        main.message(globalConstants.IPC_METHOD_RELOAD_VIEW, { viewId });
        break;
      case 'createModel':
        main.message(globalConstants.IPC_METHOD_CREATE_MODEL, { viewId });
        break;
      default:
    }
  };

  getTitleStyle() {
    const { configuration: { titleStyle = {} } } = this.props;
    const style = {
      fontFamily: titleStyle.font ? titleStyle.font : null,
      fontSize: titleStyle.size ? titleStyle.size : null,
      textAlign: titleStyle.align ? titleStyle.align : null,
      color: titleStyle.color ? titleStyle.color : null,
      background: titleStyle.bgColor ? titleStyle.bgColor : null,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      paddingRight: '57px',
    };

    if (titleStyle.bold) {
      style.fontWeight = 'bold';
    }
    if (titleStyle.italic) {
      style.fontStyle = 'italic';
    }
    if (titleStyle.underline) {
      style.textDecoration = 'underline';
    } else if (titleStyle.strikeOut) {
      style.textDecoration = 'line-through';
    }
    return style;
  }

  save = (e) => {
    if (e) e.preventDefault();
    const {
      viewId,
      absolutePath,
    } = this.props;
    main.message(
      globalConstants.IPC_METHOD_SAVE_VIEW,
      { saveMode: absolutePath, viewId }
    );
  }

  moveView = (toPage) => {
    const { isViewsEditorOpen, closeEditor } = this.props;
    if (isViewsEditorOpen && closeEditor) {
      closeEditor();
    }
    const { viewId, moveViewToPage } = this.props;
    const { windowId } = this.context;
    moveViewToPage(windowId, toPage, viewId);
  }

  expand = () => {
    const {
      viewId,
      collapseView,
      collapsed,
    } = this.props;
    const { focusedPageId } = this.context;

    collapseView(focusedPageId, viewId, !collapsed);
  }

  render() {
    const {
      configuration,
      isViewsEditorOpen,
      collapsed,
      oId,
      absolutePath,
      isModified,
    } = this.props;
    let title = configuration.title;
    if (isModified) {
      title = title.concat(' *');
    }

    const titleStyle = this.getTitleStyle();
    const expandButtonStyle = { opacity: '1', backgroundColor: 'rgb(239,239,239)', color: 'rgb(51,51,51)', padding: '3px 6px', marginLeft: '3px', marginRight: '3px', marginTop: '1px', height: '22px', border: '1px solid rgb(180,180,180)' };
    const saveButtonStyle = { opacity: '1', backgroundColor: 'rgb(239,239,239)', color: 'rgb(51,51,51)', padding: '3px 6px', marginLeft: '3px', marginRight: '3px', marginTop: '1px', height: '22px', border: '1px solid rgb(180,180,180)' };

    const isPathDefined = oId || absolutePath;

    const choosePageDlg = (
      <Modal
        title="Choose Page to move to"
        isOpened={this.state.choosePage}
        onClose={() => this.setState({ choosePage: false })}
      >
        <ChoosePage
          onClose={this.moveView}
          pageTitles={this.state.pageTitles}
        />
      </Modal>
    );

    return (
      <div
        className={classnames(styles.container, {
          [styles.containerActive]: isViewsEditorOpen,
        })}
      >
        <div
          style={titleStyle}
          className={`${styles.title} moveHandler ellipsis`}
        >
          {title}
        </div>
        {choosePageDlg}
        <div className={styles.dropDownButtonContainer} >
          {!collapsed && <DropdownButton
            pullRight
            noCaret
            className={styles.dropDownButton}
            bsStyle="link"
            title="MENU"
            bsSize="xsmall"
            onSelect={this.onDropDownClick}
            id={`menu${this.props.viewId}`}
          >
            <MenuItem eventKey="editor" active>{isViewsEditorOpen ? 'Close' : 'Open'} editor</MenuItem>
            <MenuItem eventKey="move">Move to another page</MenuItem>
            <MenuItem eventKey="collapse">Collapse</MenuItem>
            {isPathDefined && isModified ? <MenuItem eventKey="reload">Reload view</MenuItem>
                           : <MenuItem eventKey="reload" disabled>Reload view</MenuItem>}
            <MenuItem divider />
            {isPathDefined ? <MenuItem eventKey="save">Save</MenuItem>
                           : <MenuItem eventKey="save" disabled>Save</MenuItem>}
            <MenuItem eventKey="saveAs">Save as</MenuItem>
            <MenuItem eventKey="createModel">Create a model from view</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="close">Close view</MenuItem>
          </DropdownButton>}
          {collapsed &&
            [
              <button key={1} style={expandButtonStyle} className={classnames('btn', 'btn-sm', 'btn-default')} onClick={this.expand}>Expand</button>,
              <button key={2} style={saveButtonStyle} className={classnames('btn', 'btn-sm', 'btn-default')} onClick={this.save}>Save</button>,
            ]
          }
        </div>
      </div>
    );
  }
}

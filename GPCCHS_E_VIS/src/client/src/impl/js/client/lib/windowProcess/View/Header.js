import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { v4 } from 'node-uuid';

import styles from './Header.css';
import Modal from '../common/Modal';
import ChoosePage from './ChoosePage';
import { sendToMain } from '../../ipc/window';


export default class Header extends Component {
  static propTypes = {
    isViewsEditorOpen: PropTypes.bool.isRequired,
    configuration: PropTypes.shape({
      title: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      titleStyle: PropTypes.object
    }),
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isCollapsed: PropTypes.bool,
    oId: PropTypes.string,
    absolutePath: PropTypes.string,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
    moveViewToPage: PropTypes.func,
    getWindowPages: PropTypes.func,
    collapseView: PropTypes.func,
    updateAbsolutePath: PropTypes.func,
    setModified: PropTypes.func,
  };
  static defaultProps = {
    configuration: {
      title: 'Untitled',
    }
  };
  static contextTypes = {
    windowId: PropTypes.string,
    focusedPageId: PropTypes.string,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      choosePage: false,
      pageTitles: []
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
      getWindowPages,
      collapseView,
      isCollapsed,
      // oId,
      absolutePath,
      updateAbsolutePath,
      setModified,
    } = this.props;

    const {
      windowId,
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
        const pageTitles = getWindowPages(windowId).reduce((list, page) => {
          list.push({ title: page.title, id: page.pageId }); // eslint-disable-line noparam-reassign
          return list;
        }, []);
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
        collapseView(focusedPageId, viewId, !isCollapsed);
        break;
      }
      case 'save':
        sendToMain('saveView', { configuration, type, absolutePath }, (payload) => {
          if (!payload.error) {
            // update View title
            setModified(viewId, false);
          }
        });
        break;
      case 'saveAs': {
        sendToMain('saveViewAs', { configuration, type, absolutePath }, (payload) => {
          if (!payload.error) {
            // update View path
            updateAbsolutePath(viewId, payload.viewPath);
            setModified(viewId, false);
          }
        });
        break;
      }
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
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none'
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
      isCollapsed,
    } = this.props;
    const { focusedPageId } = this.context;

    collapseView(focusedPageId, viewId, !isCollapsed);
  }

  render() {
    const {
      configuration,
      isViewsEditorOpen,
      isCollapsed,
      oId,
      absolutePath,
    } = this.props;
    const { title } = configuration;
    const titleStyle = this.getTitleStyle();
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
          [styles.containerActive]: isViewsEditorOpen
        })}
      >
        <div
          style={titleStyle}
          className={`${styles.title} moveHandler ellipsis`}
        >
          {title}
        </div>
        {choosePageDlg}
        <div>
          {!isCollapsed && <DropdownButton
            pullRight
            bsStyle="link"
            title="menu"
            bsSize="xsmall"
            onSelect={this.onDropDownClick}
            id={`menu${this.props.viewId}`}
          >
            <MenuItem eventKey="editor" active>{isViewsEditorOpen ? 'Close' : 'Open'} editor</MenuItem>
            <MenuItem eventKey="move">Move to another page</MenuItem>
            <MenuItem eventKey="collapse">Collapse</MenuItem>
            {/* <MenuItem eventKey="reload">Reload view</MenuItem>*/}
            <MenuItem divider />
            {isPathDefined ? <MenuItem eventKey="save">Save</MenuItem>
                           : <MenuItem eventKey="save" disabled>Save</MenuItem>}
            <MenuItem eventKey="saveAs">Save as</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="close">Close view</MenuItem>
          </DropdownButton>}
          {isCollapsed &&
            <a className={classnames('btn', 'btn-sm', 'btn-default')} onClick={this.expand}>Expand</a>
          }
        </div>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { v4 } from 'node-uuid';
import styles from './Header.css';
import Modal from '../common/Modal';
import ChoosePage from './ChoosePage';

export default class Header extends Component {
  static propTypes = {
    isViewsEditorOpen: PropTypes.bool.isRequired,
    configuration: PropTypes.shape({
      title: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      titleStyle: PropTypes.object
    }),
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
    moveViewToPage: PropTypes.func,
    getWindowPages: PropTypes.func,
  };
  static defaultProps = {
    configuration: {
      title: 'Untitled',
    }
  };
  static contextTypes = {
    windowId: PropTypes.string,
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
    } = this.props;
    const { windowId } = this.context;
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
      case 'save': {
        // TODO call a saveView function
        break;
      }
      case 'saveAs': {
        // TODO call a saveView function
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


  render() {
    const { configuration, isViewsEditorOpen } = this.props;
    const { title } = configuration;
    const titleStyle = this.getTitleStyle();


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
          <DropdownButton
            pullRight
            bsStyle="link"
            title="menu"
            bsSize="xsmall"
            onSelect={this.onDropDownClick}
            id={`menu${this.props.viewId}`}
          >
            <MenuItem eventKey="editor" active>{isViewsEditorOpen ? 'Close' : 'Open'} editor</MenuItem>
            <MenuItem eventKey="move">Move to another page</MenuItem>
            {/* <MenuItem eventKey="reload">Reload view</MenuItem>*/}
            <MenuItem divider />
            <MenuItem eventKey="save">Save</MenuItem>
            <MenuItem eventKey="saveAs">Save as</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="close">Close view</MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  }
}

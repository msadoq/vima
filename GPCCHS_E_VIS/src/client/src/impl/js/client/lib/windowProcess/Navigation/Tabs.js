import React, { Component, PropTypes } from 'react';
import { Nav, NavItem, Button, Glyphicon } from 'react-bootstrap';
import styles from './Tabs.css';

export default class Tabs extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    focusedPageId: PropTypes.string,
    focusPage: PropTypes.func,
    addAndMount: PropTypes.func,
    removeAndUnmountPage: PropTypes.func,
  };
  constructor(...args) {
    super(...args);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleSelect(eventKey) {
    if (eventKey === 'new') {
      return this.props.addAndMount();
    }

    this.props.focusPage(eventKey);
  }
  handleClose(e, pageId) {
    e.preventDefault();
    e.stopPropagation();
    this.props.removeAndUnmountPage(pageId);
    e.stopPropagation();
  }
  render() {
    const { pages, focusedPageId } = this.props;
    return (
      <Nav bsStyle="tabs" activeKey={focusedPageId} onSelect={this.handleSelect}>
        {pages.map(page =>
          <NavItem
            key={page.pageId}
            eventKey={page.pageId}
          >
            <div className={styles.title}>
              {page.title}
              <Button
                bsStyle="link"
                onClick={e => this.handleClose(e, page.pageId)}
                className={styles.close}
              >
                <Glyphicon glyph="remove-circle" />
              </Button>
            </div>
          </NavItem>
        )}
        <NavItem eventKey="new">New page +</NavItem>
      </Nav>
    );
  }
}

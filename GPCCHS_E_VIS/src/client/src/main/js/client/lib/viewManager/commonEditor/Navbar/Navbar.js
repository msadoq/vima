import React, { PropTypes } from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import styles from './style.css';

export default class Navbar extends React.Component {

  static propTypes = {
    currentDisplay: PropTypes.number.isRequired,
    changeCurrentDisplay: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    closeEditor: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.setState({ activeTab: this.props.currentDisplay });
  }

  onNavItemClick = (tabIndex) => {
    this.setState({ activeTab: tabIndex });
    this.props.changeCurrentDisplay(tabIndex);
  }

  render() {
    const { items, closeEditor } = this.props;
    const { activeTab } = this.state;
    return (
      <Nav
        className={styles.root}
        bsStyle="tabs"
        activeKey={activeTab}
        onSelect={this.onNavItemClick}
      >
        {items.map((item, index) => (
          <NavItem
            key={item}
            eventKey={index}
          >
            {item}
          </NavItem>
        ))}
        <NavItem className="pull-right" onClick={closeEditor}>
          <Glyphicon
            glyph="remove-circle"
            className="text-danger"
          />
        </NavItem>
      </Nav>
    );
  }
}
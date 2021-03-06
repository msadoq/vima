// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Remove an useless eslint-disable noparam-reassign
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Maj design : remove data & html buttons, add new
//  open editor button
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup actions . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : TEMP - TO RESET . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add Tooltip and use it in dropdown menu
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : REVERT Add Tooltip and use it in dropdown menu"
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Fix Tooltip when collapse and resize window
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add Tooltip and use it in dropdown menu
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : merge dev into work branch
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Move page items order in navbar
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Save / Expand buttons on view, style review.
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : update MoveViewToPage modal to the generic modal
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Collapsed view : SAVE here when isModified: true,
//  bolds in editor, eslint-disable with reason, colors for bgcolor are full colors.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : fix save view in contextual menu
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Clarify renderer/onSaveView controller . .
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : fix save view in contextual menu
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Collapsed view : SAVE here when isModified: true,
//  bolds in editor, eslint-disable with reason, colors for bgcolor are full colors.
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : User can now show/hide/remove EP from Plot in
//  legend.
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : view title is bold when openned in editor. + other
//  fixes.
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : react-grid-layout handles are hidden when view is
//  collapsed.
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : DM : #6129 : 27/06/2017 : Fix saving view . .
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 27/06/2017 : Fix view saving . .
// VERSION : 1.1.2 : FA : #7217 : 07/07/2017 : Go back to previous mechanism to save a view + fix
//  crash on minify view save
// VERSION : 2.0.0 : FA : #8086 : 26/09/2017 : Saving view by clicking SAVE on a collapse view
//  fixed.
// VERSION : 2.0.0 : FA : #10835 : 23/02/2018 : head color on views depends on domains
// VERSION : 2.0.0 : FA : #10835 : 28/02/2018 : add global configuration for colors
// VERSION : 2.0.0 : FA : #10835 : 01/03/2018 : if EntryPoint's domain is '*', uses the page
//  domain, or workspace domain.
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// VERSION : 2.0.0.3 : FA : ISIS-FT-3152 : 30/05/2018 : correction bug domain colors algo
// VERSION : 2.0.0.3 : FA : ISIS-FT-3174 : 30/05/2018 : disable background color on view header for
//  multisat handle
// VERSION : 2.0.0.3 : FA : ISIS-FT-3152 : 30/05/2018 : comportement multisat VIMA . .
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button, Glyphicon } from 'react-bootstrap';
import styles from './Header.css';
import { getColorWithDomainDetermination } from '../common/colors';

export default class Header extends PureComponent {
  static propTypes = {
    isViewsEditorOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.shape({
      font: PropTypes.string,
      size: PropTypes.number,
      bold: PropTypes.bool,
      italic: PropTypes.bool,
      underline: PropTypes.bool,
      strikeOut: PropTypes.bool,
      align: PropTypes.string,
      color: PropTypes.string,
    }),
    viewVersion: PropTypes.shape().isRequired,
    collapsed: PropTypes.bool.isRequired,
    isModified: PropTypes.bool.isRequired,
    saveView: PropTypes.func.isRequired,
    collapseView: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    domains: PropTypes.arrayOf(PropTypes.string).isRequired,
    pageDomain: PropTypes.string.isRequired,
    workspaceDomain: PropTypes.string.isRequired,
    isSearchOpenForView: PropTypes.bool.isRequired,
    viewDomain: PropTypes.string.isRequired,
  };

  static defaultProps = {
    title: 'Untitled',
    titleStyle: {},
  };

  getTitleStyle() {
    const {
      titleStyle,
    } = this.props;
    const style = {
      fontFamily: titleStyle.font ? titleStyle.font : null,
      fontSize: titleStyle.size ? titleStyle.size : null,
      textAlign: titleStyle.align ? titleStyle.align : null,

      color: titleStyle.color ? titleStyle.color : null,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      paddingRight: '57px',
    };

    if (style.background !== null) {
      style.color = titleStyle.color ? titleStyle.color : '#FFF';
    }

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

  getHeaderStyle() {
    const {
      domains,
      pageDomain,
      workspaceDomain,
      viewDomain,
    } = this.props;

    return {
      background: getColorWithDomainDetermination(
        workspaceDomain,
        [pageDomain],
        [viewDomain],
        domains,
        'view'
      ),
    };
  }

  expand = () => {
    const { collapseView, collapsed } = this.props;
    collapseView(!collapsed);
  }

  render() {
    const {
      isViewsEditorOpen,
      collapsed,
      isModified,
      onContextMenu,
      isSearchOpenForView,
      viewVersion,
    } = this.props;
    const title = `${this.props.title} ${isModified ? ' *' : ''}`;


    const titleStyleTransformed = this.getTitleStyle();
    const headerStyle = this.getHeaderStyle();
    const versionColor = {
      color: 'white',
    };
    return (
      <div
        className={classnames(styles.container)}
        style={headerStyle}
      >
        <div
          style={titleStyleTransformed}
          className={`moveHandler ellipsis ${styles.title}`}
        >
          {isSearchOpenForView &&
          <span className={styles.searchOpen}>
            <Glyphicon glyph="search" />
          </span>
          }
          {title}{isViewsEditorOpen ? ' (in edition)' : ''}
        </div>
        <div className={styles.versionContainer} >
          Version:
        </div>
        <div className={styles.versionContainer} style={versionColor} >
          {viewVersion.externalVersion && viewVersion.externalVersion.value}
        </div>
        <div className={styles.versionContainer} style={versionColor}>
          {viewVersion.internalVersion && viewVersion.internalVersion.symbol}
        </div>
        <div className={styles.ghostDiv} />
        <div className={styles.dropDownButtonContainer} >
          {!collapsed &&
            <button key={1} className={styles.expandButton} onClick={this.expand}>
              <Glyphicon glyph="minus" />
            </button>
          }
          {
            collapsed &&
            <button
              className={styles.expandButton}
              onClick={this.expand}
              title="Expand"
            >
              &#9633;
            </button>
          }
          <Button
            className={styles.expandButton}
            onClick={onContextMenu}
            title="Display Menu"
          >
            <Glyphicon glyph="align-justify" />
          </Button>
          {
            (collapsed && isModified) &&
            <button
              key={2}
              className={classnames(styles.expandButton, styles.saveButton)}
              onClick={this.props.saveView}
            >
              SAVE
            </button>
          }
        </div>
      </div>
    );
  }
}

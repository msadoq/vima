// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6785 : 13/06/2017 : Fix path writing after choice
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Button } from 'react-bootstrap';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import Collapse from 'rc-collapse';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import styles from './Misc.css';
import AddLink from './AddLink';

const { Panel } = Collapse;

export default class Links extends React.Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateViewSubPanels: PropTypes.func.isRequired,
    viewId: PropTypes.string.isRequired,
    removeLink: PropTypes.func.isRequired,
    updateLink: PropTypes.func.isRequired,
    panels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.bool,
    ]).isRequired,
  };

  onChange = (openPanels) => {
    const { updateViewSubPanels, viewId } = this.props;
    updateViewSubPanels(viewId, 'panels', 'links', openPanels);
  };

  handleRemoveLink = (e, key) => {
    const { removeLink, viewId } = this.props;
    e.preventDefault();
    e.stopPropagation();
    removeLink(viewId, key);
  };

  handleSubmitFactory = _memoize(key => values => this.handleSubmit(key, values));

  handleSubmit = (key, values) => {
    const { updateLink, viewId } = this.props;
    updateLink(viewId, key, values);
  };

  render() {
    const { links, panels, viewId } = this.props;
    const activeKeys = links.map(value => value.name);

    return (
      <ErrorBoundary>
        <Collapse
          accordion={false}
          onChange={this.onChange}
          defaultActiveKeys={activeKeys}
        >
          {links.map((value, key) => (
            <Panel
              key={'link'.concat(`_${key}`)}
              header={
                <div className="rc-collapse-header-inner">
                  <span className="">&nbsp;&nbsp;&nbsp;{value.name}</span>
                  <div>
                    <Button
                      bsSize="xsmall"
                      className={classnames('btn-link', styles.removeButton)}
                      onClick={e => this.handleRemoveLink(e, key)}
                    >
                      <Glyphicon
                        className="text-danger"
                        glyph="remove"
                        title="Remove"
                      />
                    </Button>
                  </div>
                </div>
              }
            >
              {Array.isArray(panels) && panels.includes('link'.concat(`_${key}`)) &&
                <AddLink
                  key={'link'.concat(`_${key}`)}
                  myFormKey={'link'.concat(`_${key}`)}
                  onSubmit={this.handleSubmitFactory(key)}
                  form={`edit-link-${key}-${viewId}`}
                  initialValues={value}
                />
            }
            </Panel>
            )
          ) }
        </Collapse>
      </ErrorBoundary>
    );
  }
}

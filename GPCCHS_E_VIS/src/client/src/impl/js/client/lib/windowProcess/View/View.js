import React, { PureComponent, PropTypes } from 'react';

import ViewHeader from './Header';
import UnknownView from './UnknownView';
import MessagesContainer from './MessagesContainer';
import styles from './View.css';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('View');

export default class View extends PureComponent {
  static propTypes = {
    component: PropTypes.func,
    isViewsEditorOpen: PropTypes.bool,
    configuration: PropTypes.object,
    visuWindow: PropTypes.object,
    data: PropTypes.object,
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
  };

  render() {
    logger.debug('render');
    const {
      configuration,
      configuration: { backgroundColour = '#FFFFFF' },
      isViewsEditorOpen,
      viewId,
      type,
      openEditor,
      closeEditor,
      unmountAndRemove,
      data,
      visuWindow,
    } = this.props;
    const ContentComponent = this.props.component || UnknownView;

    return (
      <div className={styles.container}>
        <ViewHeader
          isViewsEditorOpen={isViewsEditorOpen}
          configuration={configuration}
          viewId={viewId}
          type={type}
          openEditor={openEditor}
          closeEditor={closeEditor}
          unmountAndRemove={unmountAndRemove}
        />
        <div
          className={styles.content}
          style={{ backgroundColor: backgroundColour }}
        >
          <MessagesContainer viewId={viewId} />
          <ContentComponent
            data={data}
            type={type}
            visuWindow={visuWindow}
            configuration={configuration}
          />
        </div>
      </div>
    );
  }
}

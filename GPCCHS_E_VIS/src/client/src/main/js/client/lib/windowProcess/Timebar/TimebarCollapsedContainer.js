// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : TimebarCollapsedContainer : remove forgotten
//  console.log .
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New
//  colors for dividers, darker.
// VERSION : 1.1.2 : FA : #6670 : 21/06/2017 : Add basic player middleware .
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { pause, play } from 'store/actions/hsc';
import { getTimebar } from 'store/reducers/timebars';
import { getPage } from 'store/reducers/pages';
import { getPlayingTimebarId } from 'store/reducers/hsc';
import { minimizeTimebar } from 'store/actions/pages';
import _ from 'lodash';
import TimebarCollapsed from './TimebarCollapsed';

export default connect(
  (state, { pageId }) => {
    const focusedPage = getPage(state, { pageId });
    const { timebarUuid } = focusedPage;
    const isPlaying = getPlayingTimebarId(state, { timebarUuid }) === timebarUuid;
    const timebar = getTimebar(state, { timebarUuid });

    return {
      timebarUuid,
      isPlaying,
      current: _.get(timebar, 'visuWindow.current', null),
    };
  }, {
    pause,
    play,
    minimizeTimebar,
  }
)(TimebarCollapsed);

import { connect } from 'react-redux';
import { updateCursors, updateViewport, updatePlayingState, updateSpeed, updateMode } from '../../store/actions/timebars';
import { updateTimebarHeight } from '../../store/actions/pages';
import { getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import TimebarWrapper from './TimebarWrapper';

export default connect(
  (state, { focusedPageId, timebar, timebarId }) => {
    const timelines = getTimebarTimelinesSelector(state, timebarId);
    const masterTimeline = (timelines[0] && timelines[0].id === timebar.masterId) ?
      timelines[0] : null;
    if (!masterTimeline) console.log('NO MASTER TIMELINE');  // TODO dispatch error on page

    let currentSession;
    if (masterTimeline) {
      currentSession = state.sessions.find(s => (s.id === masterTimeline.sessionId));
    }
    if (!currentSession) console.log('NO CURRENT SESSION'); // TODO dispatch error on page

    const currentSessionOffsetMs = currentSession ? currentSession.offsetWithmachineTime : null;

    return {
      visuWindow: timebar.visuWindow,
      slideWindow: timebar.slideWindow,
      focusedPageId,
      timebarHeight: timebar.timebarHeight,
      timelines,
      currentSessionOffsetMs,
      sessions: state.sessions,
    };
  }, {
    updateMode,
    updateCursors,
    updateViewport,
    updatePlayingState,
    updateSpeed,
    updateTimebarHeight,
  }
)(TimebarWrapper);

// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/02/2017 : Standardized time formats between Timebar and
//  PlotView, between moment JS and D3 JS.
// VERSION : 1.1.2 : DM : #3622 : 22/02/2017 : Offsets displayed in tooltip !!!
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing decorator on DEBUG only (for each
//  process) - Move decorator on makeSlave/MasterDispatcher
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing info to meta action's
// VERSION : 1.1.2 : DM : #6700 : 13/09/2017 : Cleanup action computing times code
// VERSION : 2.0.0 : FA : ISIS-FT-2311 : 31/10/2017 : Timeline's offset is now expressed in
//  d-h-m-s-ms format.
// END-HISTORY
// ====================================================================

function fi(i) {
  const s = i.toString();
  if (s.length === 1) return `0${s}`;
  if (s.length === 0) return '00';
  return s;
}

function fims(i) {
  const s = i.toString();
  if (s.length === 2) return `0${s}`;
  if (s.length === 1) return `00${s}`;
  if (s.length === 0) return '000';
  return s;
}

export function formatDuration(duration) {
  let ms = duration;
  const neg = ms < 0;
  if (neg) ms = Math.abs(ms);
  const d = Math.floor(ms / 86400000);
  ms -= d * 86400000;
  const h = Math.floor(ms / 3600000);
  ms -= h * 3600000;
  const m = Math.floor(ms / 60000);
  ms -= m * 60000;
  const s = Math.floor(ms / 1000);
  ms -= s * 1000;
  return `${neg ? '- ' : '+ '}${d !== 0 ? `${d}d ` : ''}${fi(h)}:${fi(m)}:${fi(s)}.${fims(ms)}`;
}

export function getZoomLevel(msWidth) {
  const zoomLevels = levelsRules.map(d => d.duration);
  let zoomLevel = zoomLevels.findIndex(v => msWidth >= v);
  if (zoomLevel === -1) {
    zoomLevel = zoomLevels.length - 1;
  }
  return zoomLevel;
}

/**
 * Compute difference of hrtime, returns ms
 * @param {hrtime} a
 * @param {hrtime} b
 */
export const computeDiffHrtime = (a, b) => {
  if (!a || !b) {
    return -1;
  }
  const as = a[0];
  const ans = a[1];
  const bs = b[0];
  const bns = b[1];
  let ns = ans - bns; // nanosecs delta, can overflow (will be negative)
  let s = as - bs; // secs delta
  if (ns < 0) { // has overflowed
    s -= 1; // cut a second
    ns += 1e9; // add a billion nanosec (to neg number)
  }
  return (s * 1000) + (ns / 1000000);
};

const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;
const min = 1000 * 60;
const sec = 1000;

export const levelsRules = [
  {
    duration: day * 365 * 10,
    startOf: 'year',
    add: [1, 'year'],
    // Format used by moment JS (Timebar)
    format: 'YYYY',
    // Format used by d3 JS (PlotView)
    formatD3: '%Y',
  },
  {
    duration: day * 365 * 2,
    startOf: 'year',
    add: [6, 'months'],
    format: 'YYYY[-]MM',
    formatD3: '%Y-%m',
  },
  {
    duration: day * 365,
    startOf: 'year',
    add: [2, 'month'],
    format: 'YYYY[-]MM[-]DD',
    formatD3: '%Y-%m-%d',
  },
  {
    duration: day * 120,
    startOf: 'year',
    add: [1, 'month'],
    format: 'YYYY[-]MM[-]DD',
    formatD3: '%Y-%m-%d',
  },
  {
    duration: day * 60,
    startOf: 'month',
    add: [15, 'day'],
    format: 'YYYY[-]MM[-]DD HH[:]mm',
    formatD3: '%Y-%m-%d %H:%M',
  },
  {
    duration: day * 30,
    startOf: 'month',
    add: [8, 'day'],
    format: 'YYYY[-]MM[-]DD HH[:]mm',
    formatD3: '%Y-%m-%d %H:%M',
  },
  {
    duration: day * 15,
    startOf: 'month',
    add: [4, 'day'],
    format: 'YYYY[-]MM[-]DD HH[:]mm',
    formatD3: '%Y-%m-%d %H:%M',
  },
  // level 5
  {
    duration: day * 7,
    startOf: 'month',
    add: [2, 'day'],
    format: 'YYYY[-]MM[-]DD HH[:]mm',
    formatD3: '%Y-%m-%d %H:%M',
  },
  {
    duration: day * 3,
    startOf: 'day',
    add: [12, 'hour'],
    format: 'MM[-]DD HH[:]mm',
    formatD3: '%m-%d %H:%M',
  },
  {
    duration: day,
    startOf: 'day',
    add: [6, 'hour'],
    format: 'MM[-]DD HH[:]mm',
    formatD3: '%m-%d %H:%M',
  },
  {
    duration: 12 * hour,
    startOf: 'day',
    add: [2, 'hour'],
    format: 'MM[-]DD HH[:]mm',
    formatD3: '%m-%d %H:%M',
  },
  {
    duration: 6 * hour,
    startOf: 'hour',
    add: [30, 'minute'],
    format: 'HH[:]mm',
    formatD3: '%H:%M',
  },
  // level 10
  {
    duration: 2 * hour,
    startOf: 'hour',
    add: [15, 'minute'],
    format: 'HH[:]mm',
    formatD3: '%H:%M',
  },
  {
    duration: min * 40,
    startOf: 'hour',
    add: [5, 'minute'],
    format: 'HH[:]mm',
    formatD3: '%H:%M',
  },
  {
    duration: min * 20,
    startOf: 'hour',
    add: [2, 'minute'],
    format: 'HH[:]mm',
    formatD3: '%H:%M',
  },
  {
    duration: min * 10,
    startOf: 'minute',
    add: [1, 'minute'],
    format: 'HH[:]mm',
    formatD3: '%H:%M',
  },
  {
    duration: min * 5,
    startOf: 'minute',
    add: [30, 'second'],
    format: 'HH[:]mm[:]ss',
    formatD3: '%H:%M:%S',
  },
  // level 15
  {
    duration: min * 2,
    startOf: 'minute',
    add: [20, 'second'],
    format: 'HH[:]mm[:]ss',
    formatD3: '%H:%M:%S',
  },
  {
    duration: min,
    startOf: 'minute',
    add: [10, 'second'],
    format: 'HH[:]mm[:]ss',
    formatD3: '%H:%M:%S',
  },
  {
    duration: sec * 30,
    startOf: 'minute',
    add: [5, 'second'],
    format: 'mm[:]ss',
    formatD3: '%M:%S',
  },
  {
    duration: sec * 10,
    startOf: 'minute',
    add: [2, 'second'],
    format: 'mm[:]ss',
    formatD3: '%M:%S',
  },
  {
    duration: sec * 5,
    startOf: 'second',
    add: [1, 'second'],
    format: 'mm[:]ss',
    formatD3: '%M:%S',
  },
  // level 20
  {
    duration: sec * 2,
    startOf: 'second',
    add: [500, 'ms'],
    format: 'mm[:]ss[.]SSS',
    formatD3: '%M:%S.%L',
  },
  {
    duration: sec,
    startOf: 'second',
    add: [200, 'ms'],
    format: 'mm[:]ss[.]SSS',
    formatD3: '%M:%S.%L',
  },
  {
    duration: sec / 2,
    startOf: 'second',
    add: [100, 'ms'],
    format: 'mm[:]ss[.]SSS',
    formatD3: '%M:%S.%L',
  },
  {
    duration: sec / 4,
    startOf: 'second',
    add: [50, 'ms'],
    format: 'mm[:]ss[.]SSS',
    formatD3: '%M:%S.%L',
  },
];

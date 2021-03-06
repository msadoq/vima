// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper
//  modules
// END-HISTORY
// ====================================================================

const _head = require('lodash/head');
const _last = require('lodash/last');
const _sortedIndexBy = require('lodash/sortedIndexBy');
const _slice = require('lodash/slice');
const _reduce = require('lodash/reduce');
const _isArray = require('lodash/isArray');

const merge = (knownIntervals, interval) => {
  if (interval.length !== 2) {
    return knownIntervals;
  }
  // No known intervals
  if (knownIntervals.length === 0) {
    return [interval];
  }

  // Lower than known intervals
  const head = _head(knownIntervals);
  if (interval[1] < head[0]) {
    return [interval, ...knownIntervals];
  }

  // Greater than known intervals
  const last = _last(knownIntervals);
  if (interval[0] > last[1]) {
    return [...knownIntervals, interval];
  }

  // Covering all known intervals
  if (interval[0] < head[0] && interval[1] > last[1]) {
    return [interval];
  }

  const lower = _sortedIndexBy(knownIntervals, interval, i => i[0]);

  // Lower limit lower than known intervals
  if (lower === 0) {
    const upper = _sortedIndexBy(knownIntervals, interval, i => i[1]);
    // And Upper limit upper than known intervals
    if (upper === knownIntervals.length) {
      return [
        interval,
      ];
    }
    // And Upper limit between intervals
    if (interval[1] < knownIntervals[upper][0]) {
      return [
        interval,
        ..._slice(knownIntervals, upper),
      ];
    }
    // And Upper limit in a known interval
    return [
      [interval[0], knownIntervals[upper][1]],
      ..._slice(knownIntervals, upper + 1),
    ];
  }

  // Interval in a known interval
  if (interval[1] < knownIntervals[lower - 1][1]) {
    return knownIntervals;
  }


  // Lower limit in a known interval
  if (interval[0] <= knownIntervals[lower - 1][1]) {
    const upper = _sortedIndexBy(knownIntervals, interval, i => i[1]);

    // And Upper limit upper than known intervals
    if (upper === knownIntervals.length) {
      return [
        ..._slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[1]],
      ];
    }

    // And Upper limit between known intervals
    if (interval[1] < knownIntervals[upper][0]) {
      return [
        ..._slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[1]],
        ..._slice(knownIntervals, upper),
      ];
    }

    // And Upper limit in a known interval
    return [
      ..._slice(knownIntervals, 0, lower - 1),
      [knownIntervals[lower - 1][0], knownIntervals[upper][1]],
      ..._slice(knownIntervals, upper + 1),
    ];
  }

  const upper = _sortedIndexBy(knownIntervals, interval, i => i[1]);

  // Lower limit between known intervals and Upper limit greater than known intervals
  if (upper === knownIntervals.length) {
    return [
      ..._slice(knownIntervals, 0, lower),
      interval,
    ];
  }

  // Lower and Upper limit both between known intervals
  if (interval[1] < knownIntervals[upper][0]) {
    return [
      ..._slice(knownIntervals, 0, lower),
      interval,
      ..._slice(knownIntervals, upper),
    ];
  }

  // Lower limit between known intervals and Upper limit in a known interval
  return [
    ..._slice(knownIntervals, 0, lower),
    [interval[0], knownIntervals[upper][1]],
    ..._slice(knownIntervals, upper + 1),
  ];
};

/**
 * Merge some intervals with an array of intervals (already merged)
 *
 * @param knownIntervals [[number, number]]
 * @param intervals [[number, number]]
 * @return merged intervals [[number, number]]
 */
module.exports = (knownIntervals, intervals) => {
  if (!_isArray(knownIntervals) || !_isArray(intervals) || intervals.length === 0) {
    return knownIntervals;
  }
  if (_isArray(intervals[0])) {
    return _reduce(
      intervals,
      (merged, interval) => merge(merged, interval),
      knownIntervals
    );
  }
  return merge(knownIntervals, intervals);
};

// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Refacto player middleware + move store/play.js
// VERSION : 2.0.0 : FA : ISIS-FT-2255 : 24/11/2017 : mode fixed timeBar VIMA Fix
// VERSION : 2.0.0 : FA : ISIS-FT-2254 : 14/12/2017 : mode normal timeBar VIMA .
// END-HISTORY
// ====================================================================

export function nextCurrent(current, speed, elapsed) {
  return current + (elapsed * speed);
}

export function computeCursors(
  current,
  previousCurrent,
  lower,
  upper,
  slideLower,
  slideUpper,
  mode,
  currentUpperMargin
) {
  /*
    Current can not equal upper
    there is a mandatory margin between the two cursors
  */
  const msWidth = upper - lower;
  const mandatoryMarginMs = currentUpperMargin * msWidth;

  let offsetMs = 0;
  if (mode === 'Normal' || mode === 'Extensible') {
    if (current + mandatoryMarginMs > upper) {
      offsetMs = (current + mandatoryMarginMs) - upper;
    } else {
      offsetMs = current - previousCurrent;
    }
  } else if (mode === 'Fixed') {
    if (current > slideUpper) {
      offsetMs = current - slideLower;
    }
  }
  const newLower = lower + offsetMs;
  const newUpper = upper + offsetMs;

  /*
  * @return { lower, upper, slideLower, slideUpper }
  */
  const r = {
    visuWindow: { current },
    slideWindow: {},
  };
  switch (mode) {
    case 'Normal':
      r.visuWindow.lower = newLower;
      r.visuWindow.upper = newUpper;
      r.slideWindow.lower = (newLower + current) / 2; // not used - invisible
      r.slideWindow.upper = (current + newUpper) / 2; // not used - invisible
      break;
    case 'Extensible':
      if (newUpper > slideUpper) {
        r.visuWindow.lower = newLower;
        r.visuWindow.upper = newUpper;
        r.slideWindow.lower = (newLower + current) / 2; // not used - invisible
        r.slideWindow.upper = newUpper;
      } else {
        r.visuWindow.lower = lower;
        r.visuWindow.upper = newUpper;
        r.slideWindow.lower = (lower + current) / 2; // not used - invisible
        r.slideWindow.upper = slideUpper;
      }
      break;
    case 'Fixed':
      if (newUpper > slideUpper) {
        r.visuWindow.lower = newLower;
        r.visuWindow.upper = newUpper;
        r.slideWindow.lower = slideLower + offsetMs;
        r.slideWindow.upper = slideUpper + offsetMs;
      } else {
        r.visuWindow.lower = newLower;
        r.visuWindow.upper = newUpper;
        r.slideWindow.lower = slideLower;
        r.slideWindow.upper = slideUpper;
      }
      break;
    default:
      r.visuWindow.lower = newLower;
      r.visuWindow.upper = newUpper;
      r.slideWindow.lower = slideLower;
      r.slideWindow.upper = slideUpper;
      break;
  }

  return r;
}

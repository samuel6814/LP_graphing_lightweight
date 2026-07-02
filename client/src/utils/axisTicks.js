export const DEFAULT_GRAPH_SCALE = {
  xMin: -1,
  xMax: 10,
  yMin: -2,
  yMax: 12,
  step: 1,
};

const MINOR_STEP = 0.1;
const MIN_LABEL_SPACING_PX = 18;

export function formatTickLabel(value) {
  const rounded = Math.round(value * 10) / 10;
  if (Math.abs(rounded - Math.round(rounded)) < 1e-9) {
    return String(Math.round(rounded));
  }
  return rounded.toFixed(1);
}

function isMajorTick(value, min, majorStep) {
  const n = (value - min) / majorStep;
  return Math.abs(n - Math.round(n)) < 1e-6;
}

export function buildAxisTicks(min, max, majorStep = 1, minorStep = MINOR_STEP, pixelsPerUnit = 40) {
  const major = [];
  const minor = [];
  const showMinorLabels = pixelsPerUnit * minorStep >= MIN_LABEL_SPACING_PX;

  const start = Math.ceil(min / minorStep) * minorStep;
  for (let v = start; v <= max + minorStep / 2; v += minorStep) {
    const value = Math.round(v * 10) / 10;
    if (value < min - 1e-9 || value > max + 1e-9) continue;

    if (isMajorTick(value, min, majorStep)) {
      major.push({ value, label: formatTickLabel(value) });
    } else {
      minor.push({
        value,
        label: showMinorLabels ? formatTickLabel(value) : null,
      });
    }
  }

  return { major, minor };
}

export function pixelsPerUnit(rangeMin, rangeMax, pixelSpan) {
  const span = rangeMax - rangeMin;
  if (span <= 0 || pixelSpan <= 0) return 40;
  return pixelSpan / span;
}

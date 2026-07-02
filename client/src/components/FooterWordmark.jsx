import styled, { useTheme } from 'styled-components';
import media from '../styles/media';

const WordmarkWrap = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.xl};

  ${media.mobile} {
    height: 90px;
    margin-top: ${({ theme }) => theme.spacing.lg};
  }
`;

const Svg = styled.svg`
  position: absolute;
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%);
  width: min(1100px, 100%);
  height: auto;
`;

const ISO_COS = Math.cos(Math.PI / 6);
const ISO_SIN = Math.sin(Math.PI / 6);

function IsoBox({ x, y, w, h, d, top, left, right }) {
  const dx = d * ISO_COS;
  const dy = -d * ISO_SIN;
  const rightFace = `M${x + w},${y} L${x + w},${y + h} L${x + w + dx},${y + h + dy} L${x + w + dx},${y + dy} Z`;
  const leftFace = `M${x},${y} L${x},${y + h} L${x + w},${y + h} L${x + w},${y} Z`;
  const topFace = `M${x},${y} L${x + w},${y} L${x + w + dx},${y + dy} L${x + dx},${y + dy} Z`;
  return (
    <g>
      <path d={rightFace} fill={right} />
      <path d={leftFace} fill={left} />
      <path d={topFace} fill={top} />
    </g>
  );
}

function LetterBlocks({ x, blocks, d, colors }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      {blocks.map(([bx, by, w, h], i) => (
        <IsoBox
          key={i}
          x={bx}
          y={by}
          w={w}
          h={h}
          d={d}
          top={colors.top}
          left={colors.left}
          right={colors.right}
        />
      ))}
    </g>
  );
}

const LETTERS = {
  L: [
    [0, 0, 7, 56],
    [0, 49, 30, 7],
  ],
  P: [
    [0, 0, 7, 56],
    [0, 0, 26, 7],
    [0, 24, 26, 7],
    [26, 0, 7, 31],
  ],
  G: [
    [0, 7, 7, 49],
    [7, 0, 22, 7],
    [26, 7, 7, 35],
    [7, 42, 26, 7],
    [19, 28, 14, 7],
  ],
  R: [
    [0, 0, 7, 56],
    [0, 0, 26, 7],
    [0, 24, 26, 7],
    [26, 0, 7, 31],
    [19, 31, 12, 7],
    [24, 38, 10, 18],
  ],
  A: [
    [4, 14, 7, 42],
    [25, 14, 7, 42],
    [0, 42, 36, 7],
    [0, 0, 36, 7],
    [11, 24, 14, 7],
  ],
  H: [
    [0, 0, 7, 56],
    [29, 0, 7, 56],
    [0, 24, 36, 7],
  ],
  E: [
    [0, 0, 7, 56],
    [0, 0, 32, 7],
    [0, 24, 28, 7],
    [0, 49, 32, 7],
  ],
};

const WORD = [
  { char: 'L', width: 36 },
  { char: 'P', width: 36 },
  { gap: true, width: 16 },
  { char: 'G', width: 36 },
  { char: 'R', width: 36 },
  { char: 'A', width: 36 },
  { char: 'P', width: 36 },
  { char: 'H', width: 36 },
  { char: 'E', width: 36 },
  { char: 'R', width: 36 },
];

export default function FooterWordmark() {
  const theme = useTheme();
  const colors = {
    top: theme.colors.inversePrimary,
    left: theme.colors.primaryContainer,
    right: theme.colors.primary,
  };
  const depth = 14;
  let cursor = 0;
  const letterElements = WORD.map((item, idx) => {
    if (item.gap) {
      cursor += item.width;
      return null;
    }
    const el = (
      <LetterBlocks key={idx} x={cursor} blocks={LETTERS[item.char]} d={depth} colors={colors} />
    );
    cursor += item.width + 8;
    return el;
  });

  return (
    <WordmarkWrap aria-hidden="true">
      <Svg viewBox={`0 0 ${cursor} 70`} preserveAspectRatio="xMidYMax meet">
        <g>{letterElements}</g>
      </Svg>
    </WordmarkWrap>
  );
}

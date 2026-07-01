import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import styled from 'styled-components';
import { parseMathText } from '../../utils/parseMathText';

const Text = styled.span`
  line-height: inherit;
`;

const MathError = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85em;
  background: ${({ theme }) => theme.colors.errorContainer};
  padding: 1px 4px;
  border-radius: 3px;
`;

const KATEX_OPTS = {
  throwOnError: false,
  strict: 'warn',
  trust: false,
};

function renderMathError() {
  return <MathError>!</MathError>;
}

const TAG_MAP = {
  p: 'p',
  span: 'span',
  div: 'div',
  h3: 'h3',
  h4: 'h4',
};

export default function MathText({ children, as = 'span', className = '' }) {
  if (!children) return null;

  const segments = parseMathText(children);
  const Tag = TAG_MAP[as] || 'span';

  const content = segments.map((seg, i) => {
    if (seg.type === 'math') {
      return (
        <InlineMath
          key={i}
          math={seg.value}
          {...KATEX_OPTS}
          renderError={renderMathError}
        />
      );
    }
    return <Text key={i}>{seg.value}</Text>;
  });

  return (
    <Tag className={`math-text ${className}`.trim()}>
      {content}
    </Tag>
  );
}

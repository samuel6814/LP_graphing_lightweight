import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import styled from 'styled-components';
import media from '../../styles/media';

const Wrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.equation};
  color: ${({ theme }) => theme.colors.onSurface};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &.block {
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    border-radius: ${({ theme }) => theme.radii.lg};
    border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
    margin: ${({ theme }) => theme.spacing.md} 0;
  }

  ${media.mobile} {
    &.block {
      padding: ${({ theme }) => theme.spacing.sm};
      margin: ${({ theme }) => theme.spacing.sm} 0;
    }
  }
`;

export default function MathBlock({ children, display = true, className = '' }) {
  if (!children) return null;
  return (
    <Wrapper className={`math-block ${display ? 'block' : ''} ${className}`}>
      {display ? <BlockMath math={children} /> : <InlineMath math={children} />}
    </Wrapper>
  );
}

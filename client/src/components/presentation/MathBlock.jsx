import { useMemo } from 'react';
import styled from 'styled-components';
import media from '../../styles/media';
import { tryRenderKatex } from '../../utils/katexRender';

const Wrapper = styled.div`
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

const MathError = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  background: ${({ theme }) => theme.colors.errorContainer};
  padding: 2px 6px;
  border-radius: 4px;
`;

const MathHtml = styled.div`
  display: ${({ $inline }) => ($inline ? 'inline' : 'block')};
`;

function KatexHtml({ html, inline }) {
  return <MathHtml $inline={inline} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function MathBlock({ children, display = true, className = '' }) {
  const { html, error } = useMemo(
    () => tryRenderKatex(children, { displayMode: display }),
    [children, display],
  );

  if (!children) return null;

  return (
    <Wrapper className={`math-block ${display ? 'block' : ''} ${className}`}>
      {error ? (
        <MathError title={error.message}>Math render error</MathError>
      ) : (
        <KatexHtml html={html} inline={!display} />
      )}
    </Wrapper>
  );
}

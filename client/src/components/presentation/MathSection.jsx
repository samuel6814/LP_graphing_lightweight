import styled from 'styled-components';
import MathBlock from './MathBlock';

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Heading = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineSm.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Body = styled.p`
  font-size: ${({ theme }) => theme.typography.bodyLg.fontSize};
  line-height: ${({ theme }) => theme.typography.bodyLg.lineHeight};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export default function MathSection({ sections = [] }) {
  return (
    <>
      {sections.map((section, i) => (
        <Section key={i}>
          {section.heading && <Heading>{section.heading}</Heading>}
          {section.math && <MathBlock>{section.math}</MathBlock>}
          {section.plain && <Body>{section.plain}</Body>}
        </Section>
      ))}
    </>
  );
}

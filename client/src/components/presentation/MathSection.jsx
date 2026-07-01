import styled from 'styled-components';
import MathBlock from './MathBlock';
import MathText from './MathText';

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Heading = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineSm.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.3;
`;

const BodyWrap = styled.div`
  font-size: ${({ theme }) => theme.typography.bodyLg.fontSize};
  line-height: ${({ theme }) => theme.typography.bodyLg.lineHeight};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

function SectionHeading({ text }) {
  if (!text) return null;
  if (text.includes('$')) {
    return (
      <Heading as="div">
        <MathText as="span">{text}</MathText>
      </Heading>
    );
  }
  return <Heading>{text}</Heading>;
}

export default function MathSection({ sections = [] }) {
  return (
    <>
      {sections.map((section, i) => (
        <Section key={i}>
          <SectionHeading text={section.heading} />
          {section.math && <MathBlock>{section.math}</MathBlock>}
          {section.plain && (
            <BodyWrap>
              <MathText as="p">{section.plain}</MathText>
            </BodyWrap>
          )}
        </Section>
      ))}
    </>
  );
}

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRight } from 'lucide-react';
import { topics } from '../../data/topicRegistry';
import { getTopicPath } from '../../utils/routes';
import { useGsapReveal } from '../../hooks/useGsapReveal';

const Section = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginDesktop}`};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineMd.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.surfaceContainerLowest};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`;

const Module = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
`;

const Title = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => `${theme.spacing.sm} 0`};
`;

const Summary = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  line-height: 1.5;
`;

const More = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const previewTopics = topics.slice(0, 6);

export default function TopicsPreview() {
  const ref = useGsapReveal('[data-reveal]');

  return (
    <Section ref={ref}>
      <Inner>
        <Heading data-reveal>Course Topics</Heading>
        <Grid>
          {previewTopics.map((t) => (
            <Card key={t.slug} to={getTopicPath(t.slug)} data-reveal>
              <Module>Module {t.module}</Module>
              <Title>{t.title}</Title>
              <Summary>{t.summary}</Summary>
            </Card>
          ))}
        </Grid>
        <More to="/learn" data-reveal>
          View all {topics.length} topics <ArrowRight size={16} />
        </More>
      </Inner>
    </Section>
  );
}

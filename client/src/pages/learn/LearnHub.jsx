import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { Search, CheckCircle, ArrowRight } from 'lucide-react';
import { topics, modules, getModuleTitle } from '../../data/topicRegistry';
import { getTopicPath } from '../../utils/routes';
import { useTopicProgress } from '../../context/TopicProgressContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { JsonLdMulti } from '../../components/seo/JsonLd';
import { learnHubSchemas } from '../../utils/seoSchema';
import { CardGrid } from '../../styles/layout';
import media from '../../styles/media';

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineMd.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
  line-height: 1.6;
`;

const SearchWrap = styled.div`
  position: relative;
  max-width: 480px;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 44px`};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.surfaceContainerLowest};
  outline: none;
  font-size: 16px;
  min-height: 44px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryFixed};
  }
`;

const ProgressWrap = styled.div`
  max-width: 480px;
`;

const ProgressLabel = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProgressTrack = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.colors.surfaceContainerHigh};
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.full};
  width: ${({ $pct }) => $pct}%;
  transition: width 0.3s ease;
`;

const ModuleBlock = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ModuleTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineSm.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.surfaceContainerHigh};
`;

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.surfaceContainerLowest};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CardTitle = styled.h3`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  line-height: 1.3;

  ${media.mobile} {
    font-size: 16px;
  }
`;

const CardSummary = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  line-height: 1.5;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  font-size: 13px;
`;

export default function LearnHub() {
  const [query, setQuery] = useState('');
  const { isComplete } = useTopicProgress();
  const { colors } = useTheme();
  const schemas = useMemo(() => learnHubSchemas(), []);

  usePageMeta({
    title: 'Learn Hub',
    description:
      'Browse 21 MATH 466 linear programming topics with KaTeX explainers, practice questions, and interactive LP graphing tools.',
    path: '/learn',
    keywords: ['learn hub', 'linear programming topics', 'MATH 466', 'optimization course'],
  });

  const completedCount = useMemo(
    () => topics.filter((t) => isComplete(t.slug)).length,
    [isComplete],
  );

  const progressPct = (completedCount / topics.length) * 100;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return topics;
    return topics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.quickAnswer?.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <JsonLdMulti graphs={schemas} />
      <Header>
        <Title>Learn Hub</Title>
        <Sub>Select a MATH 466 topic to study explainers, practice questions, and interactive graphs.</Sub>
        <SearchWrap>
          <Search size={18} />
          <SearchInput
            placeholder="Search topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </SearchWrap>
        <ProgressWrap>
          <ProgressLabel>
            {completedCount} of {topics.length} topics complete
          </ProgressLabel>
          <ProgressTrack>
            <ProgressFill $pct={progressPct} />
          </ProgressTrack>
        </ProgressWrap>
      </Header>

      {modules.map((mod) => {
        const modTopics = filtered.filter((t) => t.module === mod.id);
        if (modTopics.length === 0) return null;
        return (
          <ModuleBlock key={mod.id}>
            <ModuleTitle>{getModuleTitle(mod.id)}</ModuleTitle>
            <CardGrid $min="260px">
              {modTopics.map((t) => (
                <Card key={t.slug} to={getTopicPath(t.slug)}>
                  <CardTop>
                    <CardTitle>{t.title}</CardTitle>
                    {isComplete(t.slug) && <CheckCircle size={18} color={colors.secondary} />}
                  </CardTop>
                  <CardSummary>{t.summary}</CardSummary>
                  <CardFooter>
                    <span>Module {t.module}</span>
                    <ArrowRight size={16} />
                  </CardFooter>
                </Card>
              ))}
            </CardGrid>
          </ModuleBlock>
        );
      })}
    </>
  );
}

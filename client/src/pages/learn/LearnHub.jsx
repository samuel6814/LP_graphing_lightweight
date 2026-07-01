import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search, CheckCircle, ArrowRight } from 'lucide-react';
import { topics, modules, getModuleTitle } from '../../data/topicRegistry';
import { getTopicPath } from '../../utils/routes';
import { useTopicProgress } from '../../context/TopicProgressContext';

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
`;

const SearchWrap = styled.div`
  position: relative;
  max-width: 480px;

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

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryFixed};
  }
`;

const ModuleBlock = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ModuleTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.surfaceContainerHigh};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
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
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CardTitle = styled.h3`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
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

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return topics;
    return topics.filter(
      (t) => t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
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
      </Header>

      {modules.map((mod) => {
        const modTopics = filtered.filter((t) => t.module === mod.id);
        if (modTopics.length === 0) return null;
        return (
          <ModuleBlock key={mod.id}>
            <ModuleTitle>{getModuleTitle(mod.id)}</ModuleTitle>
            <Grid>
              {modTopics.map((t) => (
                <Card key={t.slug} to={getTopicPath(t.slug)}>
                  <CardTop>
                    <CardTitle>{t.title}</CardTitle>
                    {isComplete(t.slug) && <CheckCircle size={18} color="#006a66" />}
                  </CardTop>
                  <CardSummary>{t.summary}</CardSummary>
                  <CardFooter>
                    <span>Module {t.module}</span>
                    <ArrowRight size={16} />
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </ModuleBlock>
        );
      })}
    </>
  );
}

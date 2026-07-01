import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { getTopicBySlug } from '../../data/topicRegistry';
import { loadTopicContent } from '../../data/topics';
import { useTools } from '../../context/ToolsContext';
import { useTopicProgress } from '../../context/TopicProgressContext';
import MathSection from '../../components/presentation/MathSection';
import PracticeQuestion from '../../components/presentation/PracticeQuestion';
import { ROUTES } from '../../utils/routes';
import media from '../../styles/media';

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 14px;
  min-height: 44px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;

  ${media.tabletDown} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const Main = styled.article`
  min-width: 0;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineMd.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.2;
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.bodyLg.fontSize};
  line-height: 1.6;
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 88px;
  min-width: 0;

  ${media.tabletDown} {
    position: static;
    order: 2;
  }
`;

const CompleteBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: ${({ theme }) => theme.colors.secondaryContainer};
  color: ${({ theme }) => theme.colors.onSecondaryContainer};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  font-size: 14px;
  min-height: 44px;

  ${media.mobile} {
    width: 100%;
  }
`;

export default function TopicPage() {
  const { topicSlug } = useParams();
  const topic = getTopicBySlug(topicSlug);
  const content = topic ? loadTopicContent(topic.slug) : null;
  const { loadTopicGraph, loadSolverSteps, setIsOpen, setActiveTab } = useTools();
  const { markTopicComplete, isComplete } = useTopicProgress();

  useEffect(() => {
    if (topic?.defaultGraph) {
      loadTopicGraph(topic.defaultGraph);
    }
  }, [topic, loadTopicGraph]);

  if (!topic) return <Navigate to={ROUTES.learn} replace />;

  const handleShowSteps = (steps) => {
    loadSolverSteps(steps);
    setActiveTab('solver');
    setIsOpen(true);
  };

  return (
    <>
      <Back to={ROUTES.learn}>
        <ArrowLeft size={16} /> Back to topics
      </Back>
      <Layout>
        <Main>
          <Title>{topic.title}</Title>
          <Summary>{topic.summary}</Summary>
          {content?.explainer && <MathSection sections={content.explainer.sections} />}
          {!isComplete(topic.slug) && (
            <CompleteBtn type="button" onClick={() => markTopicComplete(topic.slug)}>
              <CheckCircle size={16} /> Mark as complete
            </CompleteBtn>
          )}
        </Main>
        <Sidebar>
          {content?.practice?.map((q, i) => (
            <PracticeQuestion key={i} question={q} onShowSteps={handleShowSteps} />
          ))}
        </Sidebar>
      </Layout>
    </>
  );
}

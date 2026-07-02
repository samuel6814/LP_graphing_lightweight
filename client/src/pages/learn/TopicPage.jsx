import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight, CheckCircle, ChevronDown, ChevronUp, LineChart } from 'lucide-react';
import { getTopicBySlug, getAdjacentTopics, getModuleTitle } from '../../data/topicRegistry';
import { loadTopicContent } from '../../data/topics';
import { useTools } from '../../context/ToolsContext';
import { useTopicProgress } from '../../context/TopicProgressContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { JsonLdMulti } from '../../components/seo/JsonLd';
import { topicPageSchemas } from '../../utils/seoSchema';
import { getTopicFaq } from '../../utils/topicFaq';
import MathSection from '../../components/presentation/MathSection';
import MathText from '../../components/presentation/MathText';
import PracticeQuestion from '../../components/presentation/PracticeQuestion';
import { ROUTES, getTopicPath } from '../../utils/routes';
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

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineMd.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.2;
  margin: 0;
`;

const CompletedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.secondaryContainer};
  color: ${({ theme }) => theme.colors.onSecondaryContainer};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 13px;
  font-weight: 600;
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.bodyLg.fontSize};
  line-height: 1.6;
`;

const QuickAnswer = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primaryContainer};
  border-radius: ${({ theme }) => theme.radii.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const QuickAnswerHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineSm.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const QuickAnswerText = styled.p`
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.onSurface};
`;

const FaqSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.outlineVariant};
`;

const FaqHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineSm.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FaqItem = styled.details`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const FaqQuestion = styled.summary`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }
`;

const FaqAnswer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  font-size: 14px;
  min-height: 44px;
`;

const CompleteBtn = styled(Btn)`
  background: ${({ theme }) => theme.colors.secondaryContainer};
  color: ${({ theme }) => theme.colors.onSecondaryContainer};
`;

const GraphBtn = styled(Btn)`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

const TocPanel = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const TocToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  min-height: 44px;

  ${media.desktop} {
    display: none;
  }
`;

const TocTitle = styled.div`
  display: none;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  ${media.desktop} {
    display: block;
  }
`;

const TocList = styled.ol`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  display: ${({ $open }) => ($open ? 'block' : 'none')};

  ${media.desktop} {
    display: block;
  }
`;

const TocLink = styled.a`
  display: block;
  padding: 4px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
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

const TopicNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.outlineVariant};

  ${media.mobile} {
    flex-direction: column;
  }
`;

const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 14px;
  min-height: 44px;
  max-width: 48%;

  ${media.mobile} {
    max-width: 100%;
  }

  &:hover {
    opacity: 0.85;
  }
`;

const NavSpacer = styled.div`
  flex: 1;
`;

function TableOfContents({ sections }) {
  const [open, setOpen] = useState(false);
  if (!sections || sections.length < 3) return null;

  return (
    <TocPanel>
      <TocToggle type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        On this page
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </TocToggle>
      <TocTitle>On this page</TocTitle>
      <TocList $open={open}>
        {sections.map((s, i) => (
          <li key={i}>
            <TocLink href={`#section-${i}`}>
              {s.heading || `Section ${i + 1}`}
            </TocLink>
          </li>
        ))}
      </TocList>
    </TocPanel>
  );
}

export default function TopicPage() {
  const { topicSlug } = useParams();
  const topic = getTopicBySlug(topicSlug);
  const content = topic ? loadTopicContent(topic.slug) : null;
  const { loadTopicGraph, loadSolverSteps, setIsOpen, setActiveTab } = useTools();
  const { markTopicComplete, isComplete } = useTopicProgress();
  const { prev, next } = getAdjacentTopics(topicSlug);

  useEffect(() => {
    if (topic?.defaultGraph) {
      loadTopicGraph(topic.defaultGraph);
    }
  }, [topic, loadTopicGraph]);

  const faqItems = useMemo(() => (content ? getTopicFaq(content) : []), [content]);

  const schemas = useMemo(() => {
    if (!topic) return [];
    return topicPageSchemas({
      topic,
      faqItems,
    });
  }, [topic, faqItems]);

  usePageMeta({
    title: topic?.title,
    description: topic ? `${topic.quickAnswer || topic.summary} — ${getModuleTitle(topic.module)}.` : undefined,
    path: topic ? `/learn/${topic.slug}` : '/learn',
    type: 'article',
    keywords: topic?.keywords,
  });

  if (!topic) return <Navigate to={ROUTES.learn} replace />;

  const handleShowSteps = (steps) => {
    loadSolverSteps(steps);
    setActiveTab('solver');
    setIsOpen(true);
  };

  const handleOpenGraph = () => {
    setActiveTab('graph');
    setIsOpen(true);
  };

  const sections = content?.explainer?.sections;
  const completed = isComplete(topic.slug);

  return (
    <>
      <JsonLdMulti graphs={schemas} />
      <Back to={ROUTES.learn}>
        <ArrowLeft size={16} /> Back to topics
      </Back>
      <Layout>
        <Main>
          <TitleRow>
            <Title>{topic.title}</Title>
            {completed && (
              <CompletedBadge>
                <CheckCircle size={14} /> Completed
              </CompletedBadge>
            )}
          </TitleRow>
          <Summary>{topic.summary}</Summary>
          {topic.quickAnswer && (
            <QuickAnswer aria-labelledby="quick-answer-heading">
              <QuickAnswerHeading id="quick-answer-heading">Quick answer</QuickAnswerHeading>
              <QuickAnswerText>{topic.quickAnswer}</QuickAnswerText>
            </QuickAnswer>
          )}
          <ActionRow>
            {topic.defaultGraph && (
              <GraphBtn type="button" onClick={handleOpenGraph}>
                <LineChart size={16} /> Open Graph
              </GraphBtn>
            )}
            {!completed && (
              <CompleteBtn type="button" onClick={() => markTopicComplete(topic.slug)}>
                <CheckCircle size={16} /> Mark as complete
              </CompleteBtn>
            )}
          </ActionRow>
          <TableOfContents sections={sections} />
          {content?.explainer && <MathSection sections={sections} idPrefix="section" />}
          {faqItems.length > 0 && (
            <FaqSection aria-labelledby="faq-heading">
              <FaqHeading id="faq-heading">Frequently asked questions</FaqHeading>
              {faqItems.map((item, i) => (
                <FaqItem key={i}>
                  <FaqQuestion>
                    <MathText as="span">{item.raw.prompt}</MathText>
                  </FaqQuestion>
                  <FaqAnswer>
                    <MathText as="span">{item.raw.answer}</MathText>
                  </FaqAnswer>
                </FaqItem>
              ))}
            </FaqSection>
          )}
          <TopicNav>
            {prev ? (
              <NavLink to={getTopicPath(prev.slug)}>
                <ArrowLeft size={16} /> {prev.title}
              </NavLink>
            ) : (
              <NavSpacer />
            )}
            {next ? (
              <NavLink to={getTopicPath(next.slug)} style={{ marginLeft: 'auto', textAlign: 'right' }}>
                {next.title} <ArrowRight size={16} />
              </NavLink>
            ) : null}
          </TopicNav>
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

import styled from 'styled-components';

const Box = styled.div`
  background: ${({ theme }) => theme.colors.secondaryFixed};
  border-left: 4px solid ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
  color: ${({ theme }) => theme.colors.onSecondaryFixed};
`;

export default function PlainEnglish({ children }) {
  return <Box>{children}</Box>;
}

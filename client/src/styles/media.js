import { breakpoints, devices } from './theme';

export const media = {
  mobile: `@media (max-width: ${devices.mobile})`,
  tablet: `@media (min-width: ${devices.tabletMin}) and (max-width: ${devices.tabletMax})`,
  tabletDown: `@media (max-width: ${devices.tabletMax})`,
  desktop: `@media (min-width: ${devices.desktop})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
};

export function up(key) {
  return `@media (min-width: ${breakpoints[key]})`;
}

export function down(key) {
  const map = { sm: breakpoints.sm, md: breakpoints.md, lg: breakpoints.lg, xl: breakpoints.xl };
  const val = parseInt(map[key], 10) - 1;
  return `@media (max-width: ${val}px)`;
}

export default media;

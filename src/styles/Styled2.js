import styled, { css } from 'styled-components';

/* ================== COLOR VARIABLES ================== */
const black = '#1e2328'; // Dark Shades
const blackAlt = '#2a2e34';
const blackLighter = '#3b3f46';

const gray = '#D6D6D6'; // Light Shades
const lightGray = '#EBEAE8';
const smokeWhite = '#f0f0f0';
const white = '#FFFDFA';

const yellow = '#fbcf14'; // Yellow Shades
const yellowAlt = '#ffc20f';
const yellowDarker = '#FAB309';
const yellowPale = '#FAD84C';

const blue = '#1D1E4E'; // Blue and Green
const seaGreen = '#108690';
const seaGreenAlt = '#0B7372';

const green = '#7AC74F'; // Other
const pistachio = '#A1CF6B';
const khaki = '#D5D887';
const flax = '#E0C879';
const terracota = '#E87461';
const periwinkle = '#D2D3EE';

/* ==================== COMPONENTS ==================== */

/* ============= HORIZONTAL LIST ============= */
export const List = styled.div`
  align-items: center;
  box-shadow: inset 0 1px 4px ${lightGray}, inset 0 -1px 4px ${lightGray};
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 3.5rem;
  gap: .25rem;
  margin-bottom: 1rem;
  overflowx-y: hidden;
`;

/* ============= CARD ============= */
export const Card = styled.div`
  border: 1px solid ${gray};
  border-radius: .3rem;
  color: ${blackLighter};
  display: flex;
  flex-flow: column nowrap;
  height: 200px;
  justify-content: flex-end;
  width: 200px;

  & > span {
    background-color: ${smokeWhite}95;
    font: 400 16px Poppins , sans-serif;
    padding: 13.5px;
    text-align: center;
    width: 100%;
  }

  &:hover {
    & > span {
      background-color: ${periwinkle}95;
    }
  }
`;

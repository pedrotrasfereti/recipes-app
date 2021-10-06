import styled from 'styled-components';

/* ================== COLOR VARIABLES ================== */

const black = '#1e2328'; // Dark Shades
const blackAlt = '#2a2e34';
const blackLighter = '#3b3f46';

const gray = '#D6D6D6'; // Light Shades
const lightGray = '#EBEAE8';
const ghostWhite = '#F6F7FB';
const white = '#FFFDFA';

const yellow = '#fbcf14'; // Yellow Shades
const yellowAlt = '#ffc20f';
const yellowDark = '#f5a302';
const yellowPale = '#FAD338';

const blue = '#1D1E4E'; // Blue and Green
const seaGreenAlt = '#0B7372';
const seaGreen = '#108690';

const red = '#DB604D'; // Other

/* ==================== COMPONENTS ==================== */

// Wrapper
export const Wrapper = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-height: 100vh;
  min-width: 100%;
`;

// LoginForm
export const LoginForm = styled.form`
  align-items: center;
  background: transparent;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  height: 50vh;
  padding: 20px;
  width: 100%;
`;

// Logo (any size)
export const Logo = styled.img`
  filter: drop-shadow(4px 4px 4px #4444dd80);
`;

// Title
export const Title = styled.h1`
  font: 500 35px Poppins , sans-serif; 
  filter: drop-shadow(3px 3px 0 #fc5f64);
`;

// Label
export const Label = styled.label`
  align-items: flex-start;
  display: flex;
  flex-flow: column nowrap;

  & > span {
    color: ${blackLighter};
    font: 500 15.5px Poppins , sans-serif;
    margin-bottom: 4px;
    margin-left: 4px;
  };
`;

// Input
export const Input = styled.input`
  appearance: none;
  background-color: ${white};
  border: 1px solid ${gray};
  border-radius: 1.2rem;
  box-shadow: 0 0 2px ${lightGray};
  color: ${blackLighter};
  padding: 10px 15px;
  width: 300px;

  &:focus {
    outline: 1px solid ${yellowAlt};
  };
`;

// Button
export const Button = styled.button`
  appearance: none;
  background-color: ${yellow};
  border: 0;
  border-radius: 1.2rem;
  box-shadow: 0 0 2px ${lightGray};
  color: ${blackAlt};
  padding: 10px 15px;
  width: 300px;
  transition: .2s;

  &:disabled {
    background-color: ${yellowPale};
    color: ${blackLighter};
  };

  &:not(:disabled):hover {
    background-color: ${yellowAlt};
    box-shadow: 0 0 5px ${yellow};
  };
`;

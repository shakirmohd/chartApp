import styled, { createGlobalStyle } from "styled-components";

// Theme
export const theme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#8884d8',
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#ffffff',
    },
    background: {
      main: '#ffffff',
      light: '#f5f5f5',
    },
    border: '#cccccc',
  },
  fonts: {
    main: 'Roboto, sans-serif',
  },
};

// Global styles
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
  
  body {
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.main};
  }
`;

// Styled components
export const ChartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
`;

export const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  label {
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  input {
    padding: 5px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-family: ${({ theme }) => theme.fonts.main};
  }
`;

export const Input = styled.input`
width: 200px;
padding: 10px;
margin-left: 10px;
border: 1px solid ${props => props.theme.colors.secondary};
border-radius: 5px;
font-size: 16px;
color: ${props => props.theme.colors.text.primary};
background-color: ${props => props.theme.colors.background};
transition: border-color 0.3s, box-shadow 0.3s;

&:focus {
  border-color: ${props => props.theme.colors.primary};
  box-shadow: 0 0 5px ${props => props.theme.colors.primary};
  outline: none;
}

&::placeholder {
  color: ${props => props.theme.colors.text.secondary};
}
`;

export const ButtonContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

export const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.light};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

export const TooltipContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.main};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ModalContent = styled.div`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.main};

  h2 {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const BackButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text.light};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;


export const TooltipText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.colors.text.primary};
`;


// Modal styles
export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '90%',
    fontFamily: theme.fonts.main,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};
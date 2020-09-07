import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 85%;
  min-height: 100vh;
  margin-left: 15%;
  background-color: ${({ theme }) => theme.color2};
`;
export const StyledText = styled.p`
  font-size: 45px;
  color: white;
  text-align: center;
  font-weight: bold;
`;

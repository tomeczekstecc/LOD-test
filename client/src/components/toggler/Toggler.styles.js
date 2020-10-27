import styled from 'styled-components';

export const TogglerWrapper = styled.div`
  #off,
  #on {
    height: 2.1rem;
    margin: 0 10px;
  }

  #off {
    transform: ${(props) => !props.offDutyMode ? 'scale(1.3)' : 'scale(1)' } ;
    color: ${(props) => !props.offDutyMode ? '#444' : 'scale(1)' } ;
  }
  #on {
    transform: ${(props) => props.offDutyMode ? 'scale(1.3)' : 'scale(1)' } ;
    color: ${(props) => props.offDutyMode ? '#444' : 'scale(1)' } ;
  }
padding-top: 2rem;
`;

import styled from 'styled-components';

export const NavWrapper = styled.div`
  #btn-left {
    visibility: ${(props) =>
      props.year === 2020 ? 'hidden !important' : 'visible'};
  }

  .title.is-2 {
    display: inline-block;
    width: 210px;
    text-align: center;
    margin-bottom: 10px;
  }

  #subtitle {
    text-align: center;
  }
  #subtitle > span {
    color: #777;
  }
`;

import styled from "styled-components";

export const Container = styled.div`
  && {
    @media (min-width: 992px) {
      .px-md-0 {
        padding-left: 0px;
        padding-right: 0px;
      }

      .mr-1 {
        margin-right: 1em;
      }
    }
  }
`;

export const Head = styled.div`
  && {
    display: flex;
    font-weight: 700;
    border-bottom: 1px solid #155aa9;
    margin-bottom: 10px;
    .title {
      /* font-weight: 700; */
    }

    .add {
      margin-left: auto;
      cursor: pointer;
      color: #155aa9;
    }
  }
`;

export const Loading = styled.div`&&{
  position: absolute;
  background: rgb(150,150,150,0.8);
  width: 100%;
  height: 100%;
  z-index: 100;
  .fa-spin {
    animation: fa-spin 2s infinite linear;
    top: 50%;
    left: 50%;
    position: absolute;
    font-size: 4em;
    color: #3c8dbc;
  }
}`
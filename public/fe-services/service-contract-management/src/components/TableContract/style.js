import styled from "styled-components";

export const Container = styled.div`
  && {
    /* height: 50vh; */
    margin-top: 20px;

    .fa-upload {
    }
    .fa-pencil {
      margin-right: 10px;
    }
    .fa-trash {
      margin-right: 10px;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .view-text {
      color: #155aa9;
      margin-bottom: 0px;
    }

    .fa-spin {
      animation: fa-spin 2s infinite linear;
      font-size: 12px;
      color: #3c8dbc;
      margin-left: 5px;
    }

    .tooltip {
      opacity: 1 !important;
      .tooltip-arrow {
        opacity: 1 !important;
      }
      .tooltip-inner {
        opacity: 1 !important;
      }
    }
    
    .rdt_TableCol_Sortable {
      :hover {
        opacity: 1;
        span {
          opacity: 1;
          i {
            opacity: 1;
          }
        }
      }
    }
  }
`;

export const NoData = styled.p`
  && {
    font-size: 20px;
    padding: 30px;
    font-weight: 700;
  }
`;

export const ActionContainer = styled.div`
  && {
    display: flex;
  }
`;

export const ProcessComponent = styled.div`&&{
  align-items: center;
  text-align: center;
  display: flex;
}`

// export const Loading = styled.div`&&{
//   position: absolute;
//   background: rgb(150,150,150,0.8);
//   /* width: 100%;
//   height: 100%; */
//   z-index: 100;
//   .fa-spin {
//     animation: fa-spin 2s infinite linear;
//     top: 50%;
//     left: 50%;
//     position: absolute;
//     /* font-size: 4em; */
//     color: #3c8dbc;
//   }
// }`
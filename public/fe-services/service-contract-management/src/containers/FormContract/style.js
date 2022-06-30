import styled from "styled-components";

export const Container = styled.div`
  && {
    .box-primary {
        padding-left: 30px;
        padding-right: 30px;
    }
    
    .pl-20px {
      padding-left: 20px;
    }

    .px-0 {
      padding-left: 0;
      padding-right: 0;
    }

    .actual-price {
      display: flex;
      height: 69px;
      align-items: flex-end;
      padding-left: 5px;
      white-space: nowrap;
      p {
        margin-bottom: 7px;
      }
    }

    .checkbox.package-service-style {
      label {
        text-transform: uppercase;
        font-weight: 700;
      }
      .checkbox {
        label {
          text-transform: capitalize;
          font-weight: 300;
          input {
            margin-left: -15px;
            margin-top: 3px;
          }
        }
      }
    }

    .form-control {
      line-height: 40px;
    }
  }
`;

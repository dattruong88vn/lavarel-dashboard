import styled from "styled-components";

export const GroupButton = styled.div`
  && {
    width: fit-content;
    margin-left: auto;

    .default {
      background-color: #ffffff;
      color: #155aa9;
      outline: none;
    }

    .search {
      background-color: #155aa9;
      color: #ffffff;
      outline: none;
    }
  }
`;

export const Container = styled.div`
  && {
    .react-datepicker-popper {
      z-index: 2;
    }
    .react-datepicker__day--outside-month{
      color: #ccc;
    }

    .form-control {
      line-height: 40px;
    }
  }
`;
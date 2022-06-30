import styled from "styled-components";

export const Container = styled.div`
  && {
    .modal-title {
      font-weight: 700;
    }

    #input-upload-file {
      display: none !important;
    }

    .fa-times {
      color: red;
      margin-left: 5px;
      cursor: pointer;
      align-self: center;
    }

    .link {
      margin-bottom: 0;
    }

    .upload-form {
      display: flex;
      .upload-text {
        color: #3c8dbc;
        cursor: pointer;
        margin-left: 5px;
      }
    }

    

    .modal-body {
      min-height: 50px;
    }
  }
`;

export const FileName = styled.div`
  && {
    display: flex;
    a {
      max-width: 80%;
    }
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }


  }
`;

export const Loading = styled.div`&&{
  position: absolute;
  background: rgb(150,150,150,0.8);
  width: 100%;
  /* height: 100%; */
  z-index: 100;
  .fa-spin {
    animation: fa-spin 2s infinite linear;
    /* top: 50%; */
    left: calc(50% - 20px);
    position: absolute;
    color: #3c8dbc;
    font-size: 20px;
  }
}`
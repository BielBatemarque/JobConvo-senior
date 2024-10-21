import styled from "styled-components";

export const StyledDiv = styled.div`
  position: relative;
  padding-top: 13px;
`;

export const StyledInput = styled.input`
  border: 1px solid lightgrey;
  border-radius: 5px;
  outline: none;
  width: ${(props) => (props.size ? props.size : '350px')};
  padding: 15px 20px;
  font-size: 16px;
  transition: all 0.1s linear;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  -webkit-appearance: none;

  &:focus {
    border: 2px solid #3951b2;
  }

  &::placeholder {
    color: transparent;
  }

  &:required:invalid + label {
    color: red;
  }

  &:focus:required:invalid {
    border: 2px solid red;
  }

  &:required:invalid + label:before {
    content: '*';
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    font-size: 13px;
    top: 0;
    color: #3951b2;
  }
`;

export const StyledLabel = styled.label`
  pointer-events: none;
  position: absolute;
  top: calc(50% - 8px);
  left: 15px;
  transition: all 0.1s linear;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  background-color: white;
  padding: 5px;
  box-sizing: border-box;
`;
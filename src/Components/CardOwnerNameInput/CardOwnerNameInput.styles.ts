import styled from "@emotion/styled";

interface InputWrapperProps {
  size: "small" | "medium" | "large";
  isValid: boolean;
  isFocused?: boolean;
}

const getInputWidth = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "71.25px";
    case "medium":
      return "152.5px";
    case "large":
      return "315px";
    default:
      return "152.5px";
  }
};

export const InputWrapper = styled.div<InputWrapperProps>`
  input,
  select {
    width: ${({ size }) => getInputWidth(size)};
    padding: 8px;
    border: 1px solid
      ${({ isValid, isFocused }) => {
        if (!isValid) return "red";
        if (isFocused) return "black";
        return "#ccc";
      }};
    border-radius: 4px;
    font-size: 16px;
  }

  input:focus {
    outline: none;
  }
`;

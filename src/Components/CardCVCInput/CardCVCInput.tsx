import React, { useEffect, useState } from "react";
import { Tooltip } from "../CardNumberInput/CardNumberInput.styles";
import Input from "../common/Input/Input";

interface CardCVCInputProps {
  value: string;
  onChange: (value: string) => void;
  setCompleted: (isCompleted: boolean) => void;
  handleOnBlur: () => void;
  handleOnFocus: () => void;
}

const CardCVCInput: React.FC<CardCVCInputProps> = ({
  value,
  onChange,
  setCompleted,
  handleOnBlur,
  handleOnFocus,
}) => {
  const [inputValues, setInputValues] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (inputValue: string) => {
    setInputValues(inputValue);
    onChange(inputValue);
    validator(inputValue);
  };

  const validator = (value: string) => {
    if (!/^\d*$/.test(value)) {
      setErrorMessage("CVC 번호는 숫자만 입력 가능합니다.");
      return;
    }

    if (value.length !== 3) {
      setErrorMessage("CVC 번호는 3자리여야 합니다.");
      return;
    }

    setErrorMessage("");
  };

  useEffect(() => {
    setCompleted(inputValues.length === 3 && !errorMessage);
  }, [inputValues, errorMessage]);

  return (
    <>
      <Input
        value={inputValues}
        onChange={handleChange}
        placeholder="123"
        size="large"
        maxLength={3}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
      />
      <Tooltip>{errorMessage}</Tooltip>
    </>
  );
};

export default CardCVCInput;

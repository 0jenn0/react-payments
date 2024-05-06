import React, { useEffect, useMemo, useState } from "react";
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
  };

  const isValid = useMemo(() => {
    const isNumericRegex = /^\d*$/;
    if (!isNumericRegex.test(inputValues)) {
      setErrorMessage("CVC 번호는 숫자만 입력 가능합니다.");
      return false;
    }

    if (inputValues.length !== 3) {
      setErrorMessage("CVC 번호는 3자리여야 합니다.");
      return false;
    }

    setErrorMessage("");
    return true;
  }, [inputValues]);

  useEffect(() => {
    setCompleted(isValid);
  }, [isValid]);

  return (
    <>
      <Input
        value={inputValues}
        onChange={(inputValue) => handleChange(inputValue)}
        placeholder="123"
        size="large"
        maxLength={3}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
      />
      <Tooltip>{!isValid ? errorMessage : ""}</Tooltip>
    </>
  );
};

export default CardCVCInput;

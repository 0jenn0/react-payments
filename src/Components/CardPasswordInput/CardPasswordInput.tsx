import React, { useEffect, useMemo, useState } from "react";
import { Tooltip } from "../CardNumberInput/CardNumberInput.styles";
import Input from "../common/Input/Input";

interface CardPasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  setCompleted: (isCompleted: boolean) => void;
}

const CardPasswordInput: React.FC<CardPasswordInputProps> = ({
  value,
  onChange,
  setCompleted,
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
      setErrorMessage("비밀번호는 숫자만 입력 가능합니다.");
      return false;
    }

    if (inputValues.length !== 2) {
      setErrorMessage("비밀번호 2자리를 입력해 주세요.");
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
        placeholder="**"
        size="large"
        maxLength={2}
        type="password"
      />
      <Tooltip>{!isValid ? errorMessage : ""}</Tooltip>
    </>
  );
};

export default CardPasswordInput;

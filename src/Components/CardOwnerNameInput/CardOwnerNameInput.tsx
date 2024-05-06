import React, { useEffect, useMemo, useState } from "react";
import { Tooltip } from "../CardNumberInput/CardNumberInput.styles";
import Input from "../common/Input/Input";

interface CardOwnerNameInputProps {
  value: string;
  onChange: (value: string) => void;
  setCompleted: (isCompleted: boolean) => void;
}

const CardOwnerNameInput: React.FC<CardOwnerNameInputProps> = ({
  value,
  onChange,
  setCompleted,
}) => {
  const [inputValues, setInputValues] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (inputValue: string) => {
    setInputValues(inputValue);
    onChange(inputValue.toUpperCase());
  };

  const isValid = useMemo(() => {
    const isEnglishRegex = /^[A-Za-z\s]*$/;
    if (!isEnglishRegex.test(inputValues)) {
      setErrorMessage("카드 소유자 이름은 영어로만 입력해 주세요");
      return false;
    }

    setErrorMessage("");
    return true;
  }, [inputValues]);

  useEffect(() => {
    setCompleted(isValid && inputValues.trim() !== "");
  }, [isValid, inputValues]);

  const handleEnter = () => {
    if (isValid && inputValues.trim() !== "") {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  };

  return (
    <>
      <Input
        value={inputValues}
        onChange={(inputValue) => handleChange(inputValue)}
        placeholder="JOHN DOE"
        size="large"
        onEnter={handleEnter}
      />
      <Tooltip>{!isValid ? errorMessage : ""}</Tooltip>
    </>
  );
};

export default CardOwnerNameInput;

import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "../CardNumberInput/CardNumberInput.styles";
import Input from "../common/Input/Input";
import { ExpiryInputWrapper } from "./CardExpiryInput.styles";

interface CardExpiryInputProps {
  month: string;
  year: string;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
  setExpiryMonthCompleted: (isCompleted: boolean) => void;
  setExpiryYearCompleted: (isCompleted: boolean) => void;
}

const CardExpiryInput: React.FC<CardExpiryInputProps> = ({
  month,
  year,
  onMonthChange,
  onYearChange,
  setExpiryMonthCompleted,
  setExpiryYearCompleted,
}) => {
  const [isMonthValid, setIsMonthValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleMonthChange = (inputValue: string) => {
    onMonthChange(inputValue);

    if (inputValue.length === 2) {
      yearRef.current?.focus();
    }
  };

  const handleYearChange = (inputValue: string) => {
    onYearChange(inputValue);
  };

  const monthValidator = (value: string) => {
    if (!/^\d*$/.test(value)) {
      setIsMonthValid(false);
      setErrorMessage("유효 기간은 숫자만 입력 가능합니다.");
      return false;
    }

    if (Number(value) > 12) {
      setIsMonthValid(false);
      setErrorMessage("달은 12까지만 가능합니다.");
      return false;
    }

    setIsMonthValid(true);
    setErrorMessage("");
    return true;
  };

  const yearValidator = (value: string) => {
    const currentYear = Number(new Date().getFullYear().toString().slice(2));

    if (!/^\d*$/.test(value)) {
      setIsYearValid(false);
      setErrorMessage("유효 기간은 숫자만 입력 가능합니다.");
      return false;
    }

    if (Number(value) < currentYear) {
      setIsYearValid(false);
      setErrorMessage(`${currentYear}년 이후만 가능합니다.`);
      return false;
    }

    setIsYearValid(true);
    setErrorMessage("");
    return true;
  };

  useEffect(() => {
    if (isMonthValid && isYearValid && month && year) {
      setExpiryMonthCompleted(true);
      setExpiryYearCompleted(true);
    } else {
      setExpiryMonthCompleted(false);
      setExpiryYearCompleted(false);
    }
  }, [isMonthValid, isYearValid, month, year]);

  return (
    <>
      <ExpiryInputWrapper>
        <Input
          ref={monthRef}
          value={month}
          onChange={(month) => handleMonthChange(month)}
          onValidate={(isValid) => setIsMonthValid(isValid)}
          maxLength={2}
          placeholder="MM"
          size="medium"
          validator={(value) => monthValidator(value)}
        />
        <Input
          ref={yearRef}
          value={year}
          onChange={(year) => handleYearChange(year)}
          onValidate={(isValid) => setIsYearValid(isValid)}
          maxLength={2}
          placeholder="YY"
          size="medium"
          validator={(value) => yearValidator(value)}
        />
      </ExpiryInputWrapper>
      <Tooltip>{!isMonthValid || !isYearValid ? errorMessage : ""}</Tooltip>
    </>
  );
};

export default CardExpiryInput;

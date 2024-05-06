import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleMonthChange = (inputValue: string) => {
    onMonthChange(inputValue);
  };

  const handleYearChange = (inputValue: string) => {
    onYearChange(inputValue);
  };

  const isMonthValid = useMemo(() => {
    const isNumericRegex = /^\d*$/;
    if (!isNumericRegex.test(month)) {
      setErrorMessage("유효 기간은 숫자만 입력 가능합니다.");
      return false;
    }

    if (Number(month) > 12) {
      setErrorMessage("달은 12까지만 가능합니다.");
      return false;
    }

    setErrorMessage("");
    return true;
  }, [month]);

  const isYearValid = useMemo(() => {
    const currentYear = Number(new Date().getFullYear().toString().slice(2));

    const isNumericRegex = /^\d*$/;
    if (!isNumericRegex.test(year)) {
      setErrorMessage("유효 기간은 숫자만 입력 가능합니다.");
      return false;
    }

    if (Number(year) < currentYear) {
      setErrorMessage(`${currentYear}년 이후만 가능합니다.`);
      return false;
    }

    setErrorMessage("");
    return true;
  }, [year]);

  useEffect(() => {
    if (isMonthValid && month.length === 2) {
      yearRef.current?.focus();
    }
  }, [isMonthValid, month]);

  useEffect(() => {
    setExpiryMonthCompleted(isMonthValid);
  }, [isMonthValid]);

  useEffect(() => {
    setExpiryYearCompleted(isYearValid);
  }, [isYearValid]);

  return (
    <>
      <ExpiryInputWrapper>
        <Input
          ref={monthRef}
          value={month}
          onChange={(month) => handleMonthChange(month)}
          maxLength={2}
          placeholder="MM"
          size="medium"
        />
        <Input
          ref={yearRef}
          value={year}
          onChange={(year) => handleYearChange(year)}
          maxLength={2}
          placeholder="YY"
          size="medium"
        />
      </ExpiryInputWrapper>
      <Tooltip>{!isMonthValid || !isYearValid ? errorMessage : ""}</Tooltip>
    </>
  );
};

export default CardExpiryInput;

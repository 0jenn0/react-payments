/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import useCardForm from "../../hooks/useCardForm";
import CardCVCInput from "../CardCVCInput/CardCVCInput";
import SelectBox from "../CardCompanySelector/CardCompanySelector";
import CardExpiryInput from "../CardExpiryInput/CardExpiryInput";
import CardInput from "../CardInput/CardInput";
import CardNumberInput from "../CardNumberInput/CardNumberInput";
import CardOwnerNameInput from "../CardOwnerNameInput/CardOwnerNameInput";
import CardPasswordInput from "../CardPasswordInput/CardPasswordInput";
import CardPreview from "../CardPreview/CardPreview";
import Button from "../common/Button/Button";
import { CardFormWrapper, FormStyle } from "./CardForm.style";

const CardForm: React.FC = () => {
  const {
    cardNumber,
    selectedCard,
    expiryMonth,
    expiryYear,
    cardholderName,
    cardCVC,
    cardPassword,
    isAllCompleted,
    showSelectBox,
    showExpiryInput,
    showCardOwnerNameInput,
    showCardCVCInput,
    showCardPasswordInput,
    isOnCVCInput,
    handleCardNumberChange,
    handleCardNumberCompleted,
    handleSelect,
    handleSelectedCardCompleted,
    handleExpiryMonthChange,
    handleExpiryYearChange,
    handleExpiryMonthCompleted,
    handleExpiryYearCompleted,
    handleCardholderNameChange,
    handleCardholderNameCompleted,
    handleCardCVC,
    handleCardCVCCompleted,
    handleCardPasswordChange,
    handleCardPasswordCompleted,
    handleCVCFocus,
    handleCVCBlur,
  } = useCardForm();

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/enrollmentCompleted", {
      state: {
        cardCompany: selectedCard,
        cardFirstPartNumbers: cardNumber.slice(0, 4),
      },
    });
  };

  return (
    <CardFormWrapper>
      <CardPreview
        cardNumber={cardNumber}
        cardCVC={cardCVC}
        expiryMonth={expiryMonth}
        expiryYear={expiryYear}
        cardholderName={cardholderName}
        cardCompany={selectedCard}
        isFront={isOnCVCInput}
      />
      <form css={FormStyle}>
        {showCardPasswordInput && (
          <CardInput
            title="비밀번호를 입력해 주세요"
            label="비밀번호 앞 2자리"
            description="앞의 2자리를 입력해주세요"
          >
            <CardPasswordInput
              value={cardPassword}
              onChange={handleCardPasswordChange}
              setCompleted={handleCardPasswordCompleted}
            />
          </CardInput>
        )}

        {showCardCVCInput && (
          <CardInput title="CVC 번호를 입력해 주세요" label="CVC">
            <CardCVCInput
              value={cardCVC}
              onChange={handleCardCVC}
              setCompleted={handleCardCVCCompleted}
              handleOnBlur={handleCVCBlur}
              handleOnFocus={handleCVCFocus}
            />
          </CardInput>
        )}

        {showCardOwnerNameInput && (
          <CardInput
            title="카드 소유자 이름을 입력해 주세요"
            description="이름 입력 후 ENTER를 눌러주세요"
            label="카드 소유자 이름"
          >
            <CardOwnerNameInput
              value={cardholderName}
              onChange={handleCardholderNameChange}
              setCompleted={handleCardholderNameCompleted}
            />
          </CardInput>
        )}

        {showExpiryInput && (
          <CardInput
            title="카드 유효기간을 입력해 주세요"
            label="유효기간"
            description="월/년도(MMYY)를 순서대로 입력해 주세요"
          >
            <CardExpiryInput
              month={expiryMonth}
              year={expiryYear}
              onMonthChange={handleExpiryMonthChange}
              onYearChange={handleExpiryYearChange}
              setExpiryMonthCompleted={handleExpiryMonthCompleted}
              setExpiryYearCompleted={handleExpiryYearCompleted}
            />
          </CardInput>
        )}

        {showSelectBox && (
          <CardInput
            title="카드사를 선택해 주세요"
            description="현재 국내 카드사만 가능합니다."
            label="카드 소유자 이름"
          >
            <SelectBox
              onSelect={handleSelect}
              setCompleted={handleSelectedCardCompleted}
            />
          </CardInput>
        )}

        <CardInput
          title="결제할 카드 번호를 입력해 주세요"
          label="카드 번호"
          description="본인 명의의 카드만 결제 가능합니다"
        >
          <CardNumberInput
            value={cardNumber}
            onChange={handleCardNumberChange}
            setCompleted={handleCardNumberCompleted}
          />
        </CardInput>
      </form>
      {isAllCompleted && <Button onClick={handleOnClick}>확인</Button>}
    </CardFormWrapper>
  );
};

export default CardForm;

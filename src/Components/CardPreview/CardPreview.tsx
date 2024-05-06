/** @jsxImportSource @emotion/react */
import React from "react";
import CardLogo from "../common/CardLogo/CardLogo";
import {
  CVCStyle,
  CardBack,
  CardFront,
  CardWrapper,
  Password,
  cardNumberStyle,
  cardNumbersStyle,
  logoDiv,
} from "./CardPreview.styles";

interface CardPreviewProps {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  cardCompany: CardCompany | "";
  cardCVC: string;
  isFront: boolean;
}

const getCardLogoOption = (cardNumber: string) => {
  const masterRegex = /^(51|52|53|54)/;
  const visaRegex = /^4/;

  if (masterRegex.test(cardNumber)) {
    return "master";
  } else if (visaRegex.test(cardNumber)) {
    return "visa";
  }
  return "none";
};

const CardPreview: React.FC<CardPreviewProps> = ({
  cardNumber,
  expiryMonth,
  expiryYear,
  cardholderName,
  cardCompany,
  cardCVC,
  isFront,
}) => {
  const formattedCardNumber = cardNumber.replace(/\d{4}(?=.)/g, "$& ");
  const cardNumberGroups = formattedCardNumber.split("  ");
  const option = getCardLogoOption(cardNumber);
  const isFrontValue = isFront;

  return (
    <CardWrapper className={!isFrontValue ? "front" : "back"}>
      <CardFront $cardCompany={cardCompany}>
        <div css={logoDiv}>
          <CardLogo option="default" />
          <CardLogo option={option} />
        </div>

        <div css={cardNumbersStyle}>
          <div css={cardNumberStyle}>{cardNumberGroups[0]}</div>
          <div css={cardNumberStyle}>{cardNumberGroups[1]}</div>
          <div css={cardNumberStyle}>
            {cardNumberGroups[2] &&
              Array.from({ length: cardNumberGroups[2].length }, () => {
                return <Password />;
              })}
          </div>
          <div css={cardNumberStyle}>
            {cardNumberGroups[3] &&
              Array.from({ length: cardNumberGroups[3].length }, () => {
                return <Password />;
              })}
          </div>
        </div>

        <div>
          {expiryMonth}
          {expiryMonth && "/"}
          {expiryYear}
        </div>
        <div>{cardholderName}</div>
      </CardFront>
      <CardBack>
        <div css={CVCStyle}>{cardCVC ? cardCVC : ""}</div>
      </CardBack>
    </CardWrapper>
  );
};

export default CardPreview;

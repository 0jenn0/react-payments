import { useMemo } from "react";
import useCardCVCInput from "./useCardCVCInput";
import useCardCompanySelect from "./useCardCompanySelect";
import useCardNumberInput from "./useCardNumberInput";
import useCardOwnerNameInput from "./useCardOwnerNameInput";
import useCardPasswordInput from "./useCardPasswordInput";
import useExpiryInput from "./useExpiryInput";
import useInputVisibility from "./useInputVisibility";

const useCardForm = () => {
  const {
    cardNumber,
    isCardNumberCompleted,
    handleCardNumberChange,
    handleCardNumberCompleted,
  } = useCardNumberInput();

  const {
    selectedCard,
    isSelectedCardCompleted,
    handleSelect,
    handleSelectedCardCompleted,
  } = useCardCompanySelect();

  const {
    expiryMonth,
    expiryYear,
    isExpiryMonthCompleted,
    isExpiryYearCompleted,
    handleExpiryMonthChange,
    handleExpiryYearChange,
    handleExpiryMonthCompleted,
    handleExpiryYearCompleted,
  } = useExpiryInput();

  const {
    cardholderName,
    isCardholderNameCompleted,
    handleCardholderNameChange,
    handleCardholderNameCompleted,
  } = useCardOwnerNameInput();

  const { cardCVC, isCardCVCCompleted, handleCardCVC, handleCardCVCCompleted } =
    useCardCVCInput();

  const {
    cardPassword,
    isCardPasswordCompleted,
    handleCardPasswordChange,
    handleCardPasswordCompleted,
  } = useCardPasswordInput();

  const {
    showSelectBox,
    showExpiryInput,
    showCardOwnerNameInput,
    showCardCVCInput,
    showCardPasswordInput,
    isOnCVCInput,
    handleCVCFocus,
    handleCVCBlur,
  } = useInputVisibility({
    isCardNumberCompleted,
    isSelectedCardCompleted,
    isExpiryCompleted: isExpiryMonthCompleted && isExpiryYearCompleted,
    isCardholderNameCompleted,
    isCardCVCCompleted,
  });

  const isAllCompleted = useMemo(() => {
    return (
      isCardCVCCompleted &&
      isCardholderNameCompleted &&
      isExpiryYearCompleted &&
      isSelectedCardCompleted &&
      isCardNumberCompleted &&
      isCardPasswordCompleted
    );
  }, [
    isCardCVCCompleted,
    isCardholderNameCompleted,
    isExpiryYearCompleted,
    isSelectedCardCompleted,
    isCardNumberCompleted,
    isCardPasswordCompleted,
  ]);

  return {
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
  };
};

export default useCardForm;

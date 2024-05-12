import React, { useContext, useState } from "react";
import { Input } from "antd";

import ColoredText from "components/typography/ColoredText";
import { LPTokenAmountContainer, LPTokenSetContainer } from "./styles";

type SetLiquidityProps = {
  lpAmount: number;
  setLpAmount: (arg: number) => void;
};

export const SetLiquidity: React.FC<SetLiquidityProps> = ({ lpAmount, setLpAmount }) => {
  const onSupplyHandler = (event: any) => {
    setLpAmount(event?.target?.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      setLpAmount(Number(inputValue));
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let value = lpAmount.toString();
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }

    setLpAmount(Number(valueTemp.replace(/0*(\d+)/, "$1")));
  };

  return (
    <LPTokenSetContainer>
      <LPTokenAmountContainer>
        <ColoredText>LP Token Amount</ColoredText>
        <Input
          placeholder="Amount"
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={10}
        ></Input>
      </LPTokenAmountContainer>
    </LPTokenSetContainer>
  );
};

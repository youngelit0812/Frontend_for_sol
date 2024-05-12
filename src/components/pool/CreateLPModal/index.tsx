import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Button, message, Steps, theme } from "antd";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { SelectToken } from "../SelectToken";
import { SetLiquidity } from "../SetLiquidity";
import { checkTokenBalances } from "utils/walletUtil";
import {
  CreateLPModalWrapper,
  CreateLPModalOverlay,
  CloseBtn,
  StepContainer,
  TitleContainer,
} from "./styles";

type CreateLPProps = {
  isShow: boolean;
  onClose: () => void;
};

export const CreateLPModal: React.FC<CreateLPProps> = ({ isShow, onClose }) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [mintAddresss, setMintAddresss] = useState<string[]>(["",""]);
  const [tokenAmounts, setTokenAmounts] = useState<number[]>([]);
  const [tokenWeights, setTokenWeights] = useState<number[]>([]);
  const [lpTokenAmount, setLpTokenAmount] = useState<number>(0);

  

  const createLPSteps = useMemo(
    () => [
      {
        title: "Select token & weights",
        content: (
          <SelectToken
            mintAddrList={mintAddresss}
            setMintAddrList={setMintAddresss}
            tokenAmountList={tokenAmounts}
            setTokenAmountList={setTokenAmounts}
            tokenWeightList={tokenWeights}
            setTokenWeightList={setTokenWeights}
          />
        ),
      },
      {
        title: "Set liquidity",
        content: <SetLiquidity lpAmount={lpTokenAmount} setLpAmount={setLpTokenAmount} />,
      },
      {
        title: "Confirm",
        content: "Last-content",
      },
    ],
    [mintAddresss]
  );

  const next = async () => {
    switch (current) {
      case 0:
        for (let tokenAmount of tokenAmounts) {
          if (tokenAmount <= 0) {
            toast(`Please, input correct token amount`, {
              theme: "dark",
            });

            return;
          }
        }

        if (publicKey) {
          // if (
          //   !(await checkTokenBalances(
          //     connection,
          //     mintAddresss,
          //     tokenAmounts,
          //     publicKey
          //   ))
          // ) {
          //   toast(`Not sufficient balance in your wallet. Please, charge!`, {
          //     theme: "dark",
          //   });

          //   return;
          // }
        } else {
          toast(`Please, connect your wallet!`, {
            theme: "dark",
          });

          return;
        }

        break;
      case 1:
        if (lpTokenAmount <= 0) {
          toast(`Please, input correct amount`, {
            theme: "dark",
          });

          return;
        }

        break;
      case 2:
        break;
    }

    setCurrent(current + 1);
  };

  const items = createLPSteps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    height: "40vh",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <CreateLPModalWrapper $isshow={isShow}>
        <CloseBtn>
          <span onClick={onClose}>&times;</span>
        </CloseBtn>
        <TitleContainer></TitleContainer>
        <StepContainer>
          <Steps
            current={current}
            labelPlacement="vertical"
            items={items}
            className="custom-step"
          />
          <div style={contentStyle}>{createLPSteps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < createLPSteps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === createLPSteps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
          </div>
        </StepContainer>
      </CreateLPModalWrapper>
      <CreateLPModalOverlay $isshow={isShow} onClick={onClose} />
    </>
  );
};

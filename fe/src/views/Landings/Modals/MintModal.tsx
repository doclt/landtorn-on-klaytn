import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { gitbook_url } from "@/configs/strings";
import { useGlobal } from "@/contexts/Globals";
import { RegisterContract } from "@/contracts/RegisterContract";
import { TornContract } from "@/contracts/TornContract";
import { getEthersSigner } from "@/hooks/useEtherSigner";
import { setSelectedNftAction } from "@/reduxs/accounts/account.actions";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import {
  ModalName,
  openOrCloseModal,
  setErrorModalAction,
} from "@/reduxs/modals/modal.slices";
import { TextVariants } from "@/themes/theme";
import { ErrorType } from "@/types";
import {
  VStack,
  Text,
  useToast,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useAccount } from "wagmi";

interface IProps extends Omit<ModalProps, "children"> {}

export interface IMintFuncRef {
  getActivity: () => boolean;
}

const MintModal = React.forwardRef(
  ({ isOpen, ...props }: IProps, ref: React.Ref<IMintFuncRef>) => {
    const { isKlayNetwork } = useGlobal();
    const dispatch = useAppDispatch();
    const { nft, isCreateNewNFT } = useAppSelector((p) => p.account);
    
    const { address } = useAccount();
    const [tokenId, setTokenId] = useState<number>();
    const [isCreatedAccount, setIsCreatedAccount] = useState<boolean>();
    const { isOpen: isTornMinting, onClose, onOpen } = useDisclosure();
    const {
      isOpen: isAccountMinting,
      onClose: onCloseMintAccount,
      onOpen: onOpenMintAccount,
    } = useDisclosure();

    const [hasActivity, setHasActivity] = React.useState<boolean>();

    useEffect(() => {
      if (isCreateNewNFT) {
        setTokenId(undefined);
      } else {
        setTokenId(nft?.tokenId);
      }
    }, [nft, isCreateNewNFT]);

    const handleMintAsync = async () => {
      try {
        const isResult = await isKlayNetwork();
        const signer = await getEthersSigner();
        if (signer && address) {
          setHasActivity(true);
          onOpen();
          const tornContract = new TornContract(signer);
          const token = await tornContract.mintTornNft();
          if (token > -1) {
            setTokenId(token);
          }
        }
      } catch (ex) {
        console.log({ex});
        dispatch(setErrorModalAction(ErrorType.OH_NO));
      }
      onClose();
    };

    const handleCreateAccountAsync = async () => {
      try {
        const isResult = await isKlayNetwork();
        if (!isResult) return;
        const signer = await getEthersSigner();
        if (signer && address && tokenId != undefined) {
          setHasActivity(true);
          onOpenMintAccount();
          const registerContract = new RegisterContract(signer);
          await registerContract.createAccount(tokenId);
          setIsCreatedAccount(true);
          dispatch(setSelectedNftAction({nft: !isCreateNewNFT  ? nft : undefined, isNew: true}));
        }
      } catch (ex) {
        console.log(ex)
        dispatch(setErrorModalAction(ErrorType.OH_NO));
      }
      onCloseMintAccount();
    };

    const handleContinueAsync = async () => {
      setTokenId(undefined);
      setIsCreatedAccount(false);
      dispatch(openOrCloseModal(ModalName.SUCCESS));
    };

    const getActivity = () => hasActivity || false;

    useImperativeHandle(ref, () => ({
      getActivity,
    }));

    useEffect(() => {
      if (isOpen) setHasActivity(false);
    }, [isOpen]);

    return (
      <CommonModal isOpen={isOpen} title="MINT YOUR SETTLER" {...props}>
        <VStack w="full">
          <Text
            textAlign="center"
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "16px", lg: "20px" }}
            // mb="-15px !important"
          >
            Settlers are NFTs on the KLAYTN Blockchain
            {/* , you will need to own ETH
            on BASE to mint. */}
          </Text>
          {/* <Link href={gitbook_url} target="_blank">
            <LandButton text="How to bridge ETH to BASE?" />
          </Link> */}
          <Text
            textAlign="center"
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "20px", lg: "32px" }}
          >
            Now lets enter the world of Lorak.
          </Text>
          <Text
            textAlign="center"
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "16px", lg: "20px" }}
          >
            Step 1. Mint your Settler NFT.
          </Text>
          <LandButton
            text="Mint"
            isLoading={isTornMinting}
            isDone={tokenId != undefined}
            onClick={handleMintAsync}
          />
          <Text
            textAlign="center"
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "16px", lg: "20px" }}
          >
            Step 2. Mint your Satchel for your Spoils.
          </Text>
          <LandButton
            text="Mint"
            isLoading={isAccountMinting} 
            isDone={isCreatedAccount}
            onClick={handleCreateAccountAsync}
          />
          <Text
            textAlign="center"
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "16px", lg: "20px" }}
          >
            Settlers are NFTs using the 6551-EIP standard, the Satchel is
            basically an account connected with your Settler NFT that allows us
            to store all your Spoils and SHARDs there.{" "}
          </Text>
          <LandButton text="Continue" onClick={handleContinueAsync} />
        </VStack>
      </CommonModal>
    );
  }
);

export default MintModal;

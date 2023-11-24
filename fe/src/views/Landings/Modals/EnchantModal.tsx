import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { TextVariants } from "@/themes/theme";
import {
  VStack,
  Text,
  ModalProps,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import ShardBalance from "../components/ShardBalance";
import { ModalName, openOrCloseModal, setErrorModalAction } from "@/reduxs/modals/modal.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import ShardBalanceInput, {
  IShardFuncRef,
} from "../components/ShardBalanceInput";
import { getEthersSigner } from "@/hooks/useEtherSigner";
import { ShardContract } from "@/contracts/ShardContract";
import { getToast } from "@/utils";
import { useAccount } from "wagmi";
import { fetchBalanceOfAccountAction, setShardBalanceAction } from "@/reduxs/accounts/account.actions";
import { ErrorType } from "@/types";

interface IProps extends Omit<ModalProps, "children"> {}

export default function EnchantModal({ ...props }: IProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {address} = useAccount();
  const { accountAddress } = useAppSelector((p) => p.account);

  const shardInputRef = useRef<IShardFuncRef>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleEnchantAsync = async () => {
    try {
      const amount = shardInputRef?.current?.getValue();
      if (!amount) {
        toast(getToast(`Amount of $Shards must be greater than 0`));
        return;
      }
      const signer = await getEthersSigner();
      if (!signer || !accountAddress || !address) return;
      onOpen();
      const shardContract = new ShardContract(signer);
      await shardContract.transfer(accountAddress, amount);
      const balanceOf = await shardContract.balanceOf(address);
      dispatch(setShardBalanceAction(balanceOf));
      await dispatch(fetchBalanceOfAccountAction(accountAddress)).unwrap();
      onClose();
      dispatch(openOrCloseModal());
      toast(getToast(`You enchanted with ${amount} $Shards.`, 'success', 'Enchantment complete.'))
    } catch (ex) {
      onClose();
      dispatch(setErrorModalAction(ErrorType.OH_NO));
    }
  };

  return (
    <CommonModal
      isBack
      onBack={() => dispatch(openOrCloseModal(ModalName.MANAGE_SETTLER))}
      title="ENCHANT"
      hBg={574}
      contentProps={{
        minH: "574px",
        w: "496px",
      }}
      {...props}
    >
      <VStack w="full">
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "20px" }}
          mb="-15px !important"
        >
          You open up an enchanting scroll and put your bag of Shards next to
          you on the Table. As you started reading the Enchantment you see
          yourself and the Shards start to gain more light. <br /> <br />{" "}
          Suddenly, a feeling of control comes, you understand that with a
          thought you can drain and absorb Shard into yourself.
          <br /> <br />
          Select amount of $Shards you want to use to Enchant your Settler.
          Remember that once Enchanted you get a probability of losing a small %
          of your shards in dungeons.
        </Text>
        <ShardBalanceInput
          hideBalanceText
          mt="30px !important"
          ref={shardInputRef}
        />
        <LandButton
          text="Enchant"
          onClick={handleEnchantAsync}
          isLoading={isOpen}
        />
      </VStack>
    </CommonModal>
  );
}

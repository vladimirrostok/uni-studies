import { FC, useState } from "react";
import FieldRadioGroup from "../fields/RadioGroup";
import FieldSwitch from "../fields/Switch";
import Box from "../containers/Box";
import Form from "../containers/Form";
import FieldInput from "../fields/Input";
import FieldLabel from "../fields/Label";
import SubmitButton from "../fields/Button";
import { getWalletService } from "../../setup";
import { issueNft } from "../../lib/utils";
import { useRouter } from "next/router";
import { TransactionWatcher } from "@elrondnetwork/erdjs/out";

const elrond_nft_management_sc_address =
  process.env.NEXT_PUBLIC_ELROND_NFT_MANAGEMENT_SC_ADDRESS;

const FormCreateCollection: FC = ({}) => {
  const router = useRouter();
  let wlt = getWalletService();
  let [statusText, setStatusText] = useState("");

  const [plan, setPlan] = useState("NFT");

  const [collectionName, setCollectionName] = useState("");
  const [collection, setCollection] = useState("");
  const [isFreezable, setIsFreezable] = useState(false);
  const [isWipeable, setIsWipeable] = useState(false);
  const [isPauseable, setIsPauseable] = useState(false);
  const [formStatus, setFormStatus] = useState(false);

  const issueNFTToken = (e) => {
    return new Promise(async (resolve, reject) => {
      setStatusText(
        "Collection is being created, confirm transaction in wallet"
      );
      e.preventDefault();
      if (collectionName && collection) {
        const tx = issueNft({
          address: elrond_nft_management_sc_address,
          chainID: "D",
          tokenName: collectionName,
          tokenTicker: collection,
          canFreeze: isFreezable,
          canWipe: isWipeable,
          canPause: isPauseable,
        });

        const signedTx = await wlt
          .signTransaction(tx)
          .then((e) => {
            setStatusText("Signing transaction");
            return e;
          })
          .catch((e) => {
            setStatusText("Transaction signing failed");
            console.log(
              "Transaction signing failed, #SHOW MODAL WITH ERROR#" + e
            );
            return null;
          });

        setStatusText("Sending transaction to the network");
        await wlt
          .sendTransaction(signedTx)
          .catch((e) => {
            setStatusText("Failed to send transaction" + e);
          })
          .then((e) => {
            setStatusText("Validating transaction on the network");
          });

        setStatusText("Validating transaction on the network");
        const watcher = new TransactionWatcher(wlt.getNetworkProvider());
        const txOnNetwork = await watcher.awaitCompleted(signedTx);

        const contractErrorResults = txOnNetwork.contractResults.items.filter(
          (result) =>
            result.returnMessage &&
            !result.returnMessage.includes("too much gas provided")
        );

        if (contractErrorResults.length > 0) {
          setStatusText(contractErrorResults[0].returnMessage);
        } else {
          setStatusText("The collection has been created!");
        }

        console.log("Transaction done");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus(true);
    setStatusText("Collection is creating...");

    const res = await issueNFTToken(e);

    router.push("/createnft");
  };

  return (
    <Form className="form_centered" method="POST" onSubmit={handleSubmit}>
      <Box className="flex-col flex-start py-3 px-2 mt-0 sm:mt-10 md:mt-20">
        <FieldLabel htmlFor="collection-name">{"Collection name"}</FieldLabel>
        <FieldInput
          id="collection_name"
          type="text"
          name="collection_name"
          placeholder="Collection name"
          onChange={(evt) =>
            setCollectionName((evt.target as HTMLTextAreaElement).value)
          }
        ></FieldInput>
      </Box>
      <Box className="flex-col justify-start py-3 px-2">
        <FieldLabel htmlFor="collection">{"Collection"}</FieldLabel>
        <FieldInput
          id="collection"
          type="text"
          name="collection"
          placeholder="Collection"
          onChange={(evt) =>
            setCollection((evt.target as HTMLTextAreaElement).value)
          }
        ></FieldInput>
      </Box>
      <FieldRadioGroup setExternalValue={setPlan} />
      <Box className="flex-wrap justify-between">
        <FieldSwitch
          id={"is_freezable"}
          name={"Freezable"}
          setExternalValue={setIsFreezable}
        />
        <FieldSwitch
          id={"is_wipeable"}
          name={"Wipeable"}
          setExternalValue={setIsWipeable}
        />
        <FieldSwitch
          id={"is_pauseable"}
          name={"Pauseable"}
          setExternalValue={setIsPauseable}
        />
        {/*<FieldSwitch*/}
        {/*  id={"is_transferable_create_role"}*/}
        {/*  name={"Transferable Create Role"}*/}
        {/*  setExternalValue={setIsTransferableCreateRole}*/}
        {/*/>*/}
      </Box>
      <SubmitButton
        type="submit"
        className="mx-auto mt-10"
        variant={!formStatus ? "btn_solid" : "btn_solid_disabled"}
        disabled={formStatus}
      >
        {"Create"}
      </SubmitButton>
      <div className="mx-auto mt-10">{statusText}</div>
    </Form>
  );
};

export default FormCreateCollection;

import { FC, useState } from "react";
import H2 from "../fields/H2";
import Box from "../containers/Box";
import Form from "../containers/Form";
import FieldInput from "../fields/Input";
import FieldLabel from "../fields/Label";
import { Transaction, TransactionWatcher } from "@elrondnetwork/erdjs/out";
import { getWalletService } from "../../setup";
import { createNFT } from "../../lib/utils";
import { useRouter } from "next/router";
import SubmitButton from "../fields/Button";

const FormCreateNFT: FC = () => {
  const router = useRouter();
  let wlt = getWalletService();
  const { ticker } = router.query;
  const { collection } = router.query;

  const [name, setName] = useState("");
  const [royalties, setRoyalties] = useState(0);
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [nft_link, setNFT_link] = useState("");

  let [statusText, setStatusText] = useState("");
  const [formStatus, setFormStatus] = useState(false);

  const createNFTToken = (e) => {
    return new Promise(async (resolve, reject) => {
      e.preventDefault();
      if (name && royalties && tags && description && nft_link) {
        setFormStatus(true);
        setStatusText("NFT is being created, confirm transaction in wallet");

        const tx = createNFT({
          senderAddress: wlt.getAddress(),
          chainID: "D",
          tokenIdentifier: ticker.toString(),
          nftName: name,
          royalties: royalties,
          uri: nft_link,
          attributes: tags,
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
          alert("NFT creation failed!");
        } else {
          setStatusText("The NFT has been created!");
        }

        console.log("Transaction done");
      }
      resolve(null);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createNFTToken(e);
    // router.push("/createnft");
  };

  return (
    <Form className="form_centered" method="POST" onSubmit={handleSubmit}>
      <H2 className="mx-auto flex-col lg:flex-row">
        {"Create NFT for : " + collection}{" "}
        <span className="text-gray-400 font-normal pl-4">{ticker}</span>
      </H2>
      <Box className="flex-col justify-start py-2 px-2 -mt-5">
        <FieldLabel htmlFor="name">{"Name"}</FieldLabel>
        <FieldInput
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          onChange={(evt) => setName((evt.target as HTMLTextAreaElement).value)}
        ></FieldInput>
      </Box>
      <Box className="flex-col justify-start py-2 px-2">
        <FieldLabel htmlFor="royalties">
          {"Royalties (between 0 and 10000)"}
        </FieldLabel>
        <FieldInput
          id="royalties"
          type="number"
          placeholder="0"
          name="royalties"
          onChange={(evt) =>
            setRoyalties(parseFloat((evt.target as HTMLTextAreaElement).value))
          }
        ></FieldInput>
      </Box>
      <Box className="flex-col justify-start py-2 px-2">
        <FieldLabel htmlFor="tags">{"Tags"}</FieldLabel>
        <FieldInput
          id="tags"
          type="text"
          placeholder="Tags"
          name="tags"
          onChange={(evt) => setTags((evt.target as HTMLTextAreaElement).value)}
        ></FieldInput>
      </Box>
      <Box className="flex-col justify-start py-2 px-2">
        <FieldLabel htmlFor="description">{"Description"}</FieldLabel>
        <FieldInput
          id="description"
          type="text"
          placeholder="Description"
          name="description"
          onChange={(evt) =>
            setDescription((evt.target as HTMLTextAreaElement).value)
          }
        ></FieldInput>
      </Box>
      <Box className="flex-col justify-start py-2 px-2">
        <FieldLabel htmlFor="nftLink">{"NFT URL"}</FieldLabel>
        <FieldInput
          id="nft_link"
          type="text"
          placeholder="ipfs.storage/link"
          name="nft_link"
          onChange={(evt) =>
            setNFT_link((evt.target as HTMLTextAreaElement).value)
          }
        ></FieldInput>
      </Box>

      <SubmitButton
        type="submit"
        className="mx-auto mt-5"
        variant={!formStatus ? "btn_solid" : "btn_solid_disabled"}
        disabled={formStatus}
      >
        {"Create NFT"}
      </SubmitButton>
      <div className="mx-auto mt-10">{statusText}</div>
    </Form>
  );
};

export default FormCreateNFT;

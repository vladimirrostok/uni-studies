//TODO : Clean up the code so only the Activate Collection components are in here.
import { FC, useEffect, useState } from "react";
import Form from "../containers/Form";
import FieldLabel from "../fields/Label";
import { getWalletService } from "../../setup";
import { assignRoles } from "../../lib/utils";
import { Transaction, TransactionWatcher } from "@elrondnetwork/erdjs/out";
import SubmitButton from "../fields/Button";
import Box from "../containers/Box";

const elrond_api_base_url = process.env.NEXT_PUBLIC_ELROND_API_URL;
const elrond_nft_management_sc_address =
  process.env.NEXT_PUBLIC_ELROND_NFT_MANAGEMENT_SC_ADDRESS;

const FormActivateCollection: FC = () => {
  let wlt = getWalletService();
  const wltAddress = wlt.getAddress();

  // Creatable collections.
  const [collections, setCollections] = useState([]);

  // Non cretable collections yet.
  const [collectionsNotCreatableYet, setCollectionsNotCreatableYet] = useState(
    []
  );
  const [collectionNotCreatableYetChosen, setCollectionNotCreatableYetChosen] =
    useState(""); //selected, not chosen
  const [
    collectionNotCreatableYetTickerChosen,
    setCollectionNotCreatableYetTickerChosen,
  ] = useState("");

  let [statusText, setStatusText] = useState("");
  let [formLock, setFormLock] = useState(false);

  // Fetch non-creatable collections.
  useEffect(() => {
    const fetchData = async () => {
      const url =
        elrond_api_base_url +
        "/accounts/" +
        wltAddress +
        "/roles" +
        "/collections" +
        "?type=NonFungibleESDT&canCreate=false";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Unable to get data from ${url}.`);
      }

      let fetched = await res.json();
      console.log(fetched);
      if (fetched) setCollectionsNotCreatableYet(fetched);
    };

    fetchData();
  }, [wltAddress]);

  function getNotCreatableYetCollectionNameByID(ticker) {
    if (!ticker) return null;

    let obj = collectionsNotCreatableYet.find((o) => o.ticker === ticker);
    return obj.name;
  }

  const handleSubmitAssignCreateRole = async (e) => {
    e.preventDefault();

    // TODO: REFACTOR
    const res = await setRulesForNFT(e);
  };

  const setRulesForNFT = (e) => {
    return new Promise(async (resolve, reject) => {
      let identifier = collectionNotCreatableYetTickerChosen;
      e.preventDefault();

      if (identifier == "") {
        alert("Please select a collection");
        return;
      }

      setFormLock(true);
      setStatusText("Role is being assigned, confirm transaction in wallet");

      if (identifier != "") {
        const tx = assignRoles({
          address: elrond_nft_management_sc_address,
          chainID: "D",
          tokenIdentifier: identifier,
          senderAddress: wltAddress,
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
          alert("collection role update failed!");
        } else {
          setStatusText("The role has been assigned!");
        }

        // Reload to re-fetch data.
        window.location.reload();
      }
    });
  };

  return (
    <>
      <Form
        className="text-center"
        method="POST"
        onSubmit={handleSubmitAssignCreateRole}
      >
        <Box className="flex-col flex-start py-3 px-2">
          <FieldLabel className="my-10 py-2 text-base lg:pt-5">
            {"Activate existing collections so that you can mint with it"}
          </FieldLabel>

          <select
            name="collections"
            id="collection-select"
            className="form_centered inline-flex mt-5 text-base bg-gray-900 hover:bg-sky-500 focus:bg-gray-700 items-center p-4 rounded-full"
            value={collectionNotCreatableYetTickerChosen}
            onChange={(e) => {
              setCollectionNotCreatableYetTickerChosen(e.target.value);
              setCollectionNotCreatableYetChosen(
                getNotCreatableYetCollectionNameByID(e.target.value)
              );
            }}
          >
            <option key={""} value={""}></option>
            {collectionsNotCreatableYet.map((item) => (
              <option
                key={item.ticker}
                value={item.ticker}
                label={item.name + " - " + item.ticker}
              >
                {item.name}
              </option>
            ))}
          </select>
        </Box>
        <SubmitButton
          type="submit"
          className="btn_solid mt-10 mx-auto"
          disabled={formLock}
        >
          {"Activate Collection"}
        </SubmitButton>
        <div className="mx-auto mt-10">{statusText}</div>
      </Form>
    </>
  );
};

export default FormActivateCollection;

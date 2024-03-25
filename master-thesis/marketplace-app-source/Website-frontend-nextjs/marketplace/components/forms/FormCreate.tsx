import { FC, useEffect, useState } from "react";
import Form from "../containers/Form";
import FieldLabel from "../fields/Label";
import { getWalletService } from "../../setup";
import SubmitButton from "../fields/Button";
import { useRouter } from "next/router";

const elrond_api_base_url = process.env.NEXT_PUBLIC_ELROND_API_URL;

const FormCreate: FC = () => {
  const router = useRouter();

  let wlt = getWalletService();
  const wltAddress = wlt.getAddress();

  // Creatable collections.
  const [collections, setCollections] = useState([]);
  const [collectionChosen, setCollectionChosen] = useState("");
  const [collectionTickerChosen, setCollectionTickerChosen] = useState("");

  let [formLock, setFormLock] = useState(false);

  // Fetch creatable collections.
  useEffect(() => {
    const fetchData = async () => {
      const url =
        elrond_api_base_url +
        "/accounts/" +
        wltAddress +
        "/roles" +
        "/collections" +
        "?type=NonFungibleESDT&canCreate=true";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Unable to get data from ${url}.`);
      }

      let fetched = await res.json();
      console.log(fetched);
      if (fetched) setCollections(fetched);
    };

    fetchData();
  }, [wltAddress]);

  function getCollectionNameByID(ticker) {
    if (!ticker) return null;

    let obj = collections.find((o) => o.ticker === ticker);
    return obj.name;
  }

  return (
    <Form className="text-center">
      <FieldLabel className={"justify-items-center pb-2"}>
        {"Select a collection that is activated and ready to mint"}
      </FieldLabel>
      <select
        name="collections"
        id="collection-select"
        className="form_centered inline-flex mt-5 text-base bg-gray-900 hover:bg-sky-500 focus:bg-gray-700 items-center p-4 rounded-full"
        value={collectionTickerChosen}
        onChange={(e) => {
          setCollectionTickerChosen(e.target.value);
          setCollectionChosen(getCollectionNameByID(e.target.value));
        }}
      >
        <option key={""} value={""}></option>
        {collections.map((item) => (
          <option
            key={item.ticker}
            value={item.ticker}
            label={item.name + " - " + item.ticker}
          >
            {item.name}
          </option>
        ))}
      </select>

      <SubmitButton
        type="submit"
        className="btn_solid mx-auto mt-10"
        disabled={formLock}
        onClick={(e) => {
          e.preventDefault();
          if (!formLock && collectionTickerChosen != "") {
            setFormLock(true);

            router.push(
              "/create-nft" +
                "?collection=" +
                collectionChosen +
                "&ticker=" +
                collectionTickerChosen
            );
          }
        }}
      >
        {"Create NFT"}
      </SubmitButton>
    </Form>
  );
};

export default FormCreate;

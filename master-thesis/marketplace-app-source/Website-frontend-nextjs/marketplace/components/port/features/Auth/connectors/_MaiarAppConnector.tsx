import { IWalletService } from "@superciety/pwa-core-library";
import { useEffect, useState } from "react";
import QrCode from "qrcode";
import H2 from "../../../../fields/H2";
import Description from "../../../../fields/Description";
import Box from "../../../../containers/Box";
import Hyperlink from "../../../../fields/Hyperlink";
import { LightningBoltIcon } from "@heroicons/react/solid";

type Props = {
  proofableToken: string;
  wallet: IWalletService;
};

export const _MaiarAppConnector = (props: Props) => {
  const [wcUri, setWcUri] = useState("");
  const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
  const preparedWalletConnectDeepLink = `${
    props.wallet.getConfig().WalletConnectDeepLink
  }?wallet-connect=${encodeURIComponent(wcUri)}`;

  const generateLoginUri = async () => {
    const { walletConnectLoginUri } = await props.wallet.login(
      props.proofableToken
    );
    if (walletConnectLoginUri) setWcUri(walletConnectLoginUri);
  };

  useEffect(() => {
    generateLoginUri();
  }, []);

  const buildQrCode = async (uri: string) =>
    setQrCodeSvg(await QrCode.toString(uri, { type: "svg" }));

  useEffect(() => {
    if (!wcUri) return;
    buildQrCode(wcUri);
  }, [wcUri]);

  return (
    <Box className="justify-center flex-col text-center">
      <div className="flex justify-center mb-4">
        {qrCodeSvg && (
          <figure
            dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
            className="h-48 w-48"
          />
        )}
      </div>
      <H2 className="mx-auto text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
        Maiar Login
      </H2>
      {props.wallet.isMobile() ? (
        <div>
          <Description className="-mt-5">
            Scan the QR code using Maiar or click the button below to open the
            App
          </Description>
          <Hyperlink
            href={preparedWalletConnectDeepLink}
            rel="noopener noreferrer nofollow"
            className="btn_solid"
            target="_blank"
          >
            <LightningBoltIcon className="h-6 w-6 mr-4 -ml-4" />
            Maiar Login
          </Hyperlink>
        </div>
      ) : (
        <Description className="-mt-5 md:text-xl">
          Scan the QR Code using Maiar
        </Description>
      )}
    </Box>
  );
};

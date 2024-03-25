import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import NextLink from "next/link";
import Arrow from "../Icons/nav-side-options/arrow";
import c from "clsx";
import { getWalletService } from "../../setup";
import { useRouter } from "next/router";
import ProfilePic from "../sections/profile/Pic";

const backend_base_url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const elrond_mainnet_api_url = process.env.NEXT_PUBLIC_MAINNET_ELROND_API_URL;

let wlt = getWalletService();

export interface navSideCollapsibleOptionsProps {
  profilename: string;
  walletaddress: string;
  htagpic: React.ReactElement;
  items: navSideCollapsibleOptionsItem[];
}

export interface navSideCollapsibleOptionsItem {
  name: string;
  link: string;
}

const NavSideCollapsibleOptionProfile: React.FC<
  navSideCollapsibleOptionsProps
> = ({ profilename, walletaddress, htagpic, items }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleTriggerClick = () => {
    setOpen(!open);
  };

  var optionsReturned = [];

  ////////////////////////////////////////////////////////////////
  let wltAddress = null;

  try {
    wltAddress = wlt.getAddress();
  } catch (err) {
    console.log(err.message);
  }

  const [Username, setUsername] = useState("");
  const [Image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let wlt = getWalletService();

      const url =
        backend_base_url +
        "/profile?profile_wallet_address=" +
        wlt.getAddress();
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Unable to get data from ${url}.`);
      }

      let fetched = await res.json();
      if (fetched.profile_name) setUsername(fetched.profile_name);
      if (fetched.profile_image_file) setImage(fetched.profile_image_file);
    };

    if (wltAddress != null) {
      fetchData();
    }
  }, [wltAddress]);
  //////////////////////////////////////////////////

  if (items) {
    for (var i = 0; i < items.length; i++) {
      optionsReturned.push(
        <>
          <li>
            <NextLink href={items[i].link}>
              <a className="inline-block w-full px-6 py-2 text-base rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white">
                {items[i].name}
              </a>
            </NextLink>
          </li>
        </>
      );
    }

    optionsReturned.push(
      <li>
        <NextLink href={"/"}>
          <a
            onClick={() => {
              wlt.logout().then((r) => window.location.reload());
            }}
            className="inline-block w-full px-6 py-2 text-base rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white"
          >
            {"Logout"}
          </a>
        </NextLink>
      </li>
    );
  }

  const wltmenu = (
    <Collapsible
      {...{ open, handleTriggerClick }}
      trigger={
        <>
          <div className="relative flex flex-row lg:flex-row-reverse p-0 text-gray-400 hover:text-white focus-within:text-white">
            <div className="flex relative items-center w-14">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                {Image != "" ? (
                  <div className="relative w-10 h-10 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white">
                    <img className="rounded-full" src={Image} alt="" />
                  </div>
                ) : (
                  htagpic
                )}
              </div>
              <NextLink href="#">
                <a className="inline-block p-5 mx-5 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"></a>
              </NextLink>
            </div>
            <div className="flex flex-col items-left lg:items-right sm:mr-5 w-full">
              <div className="text-base text-slate-50">
                {Username != "" ? Username : profilename}
              </div>
              <span className="text-base text-slate-400 font-light tracking-tight">
                {wltAddress
                  ? wltAddress.substring(0, 4) +
                    "..." +
                    wltAddress.substring(
                      wltAddress.length - 6,
                      wltAddress.length
                    )
                  : walletaddress}
              </span>
            </div>

            <button
              className="inline-block h-5 mt-3 mr-3 p-0 text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white"
              tabIndex={-1}
            >
              <Arrow
                className={c(
                  [
                    "flex flex-end w-5 h-5 stroke-current transition-transform duration-800",
                  ],
                  [open ? "rotate-180" : ""]
                )}
              />
            </button>
          </div>
        </>
      }
    >
      <div className="p-2 my-2 ml-4">
        <ul className="flex flex-col pl-2 w-full text-gray-400 border-l border-fuchsia-500">
          <li className="w-50">{optionsReturned}</li>
        </ul>
      </div>
    </Collapsible>
  );

  const wltMenuMustLogIn = (
    <Collapsible
      {...{ open, handleTriggerClick }}
      trigger={
        <>
          <div className="relative flex flex-row lg:flex-row-reverse p-0 text-gray-400 hover:text-white focus-within:text-white">
            <div className="flex flex-col items-left lg:items-right sm:mr-5 w-full">
              <div className="text-base text-slate-50">
                <button
                  onClick={() => router.push("/wallet")}
                  className="btn bg-sky-500 rounded-md px-2 mx-2 hover:text-white hover:bg-sky-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-0"
                >
                  <span className="group-hover:bg-opacity-0 ">{"Sign in"}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      }
    ></Collapsible>
  );

  return <>{wlt.isLoggedIn() === true ? wltmenu : wltMenuMustLogIn}</>;
};

export default NavSideCollapsibleOptionProfile;

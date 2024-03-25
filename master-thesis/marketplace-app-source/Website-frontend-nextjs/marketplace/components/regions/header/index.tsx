import { FC } from "react";
import SidebarMobile from "./SidebarMobile";
import NavSideCollapsibleOptionProfile from "../../navigations/NavSideCollapsibleOptionProfile";
import Box from "../../containers/Box";
import FormSearch from "../../forms/FormSearch";
import Logo from "./Logo";

// Refactor : Use of Hyperlink in header span may not be most efficient

const IndexHeader: FC = () => {
  return (
    <header className="header-sticky bg-black flex items-center w-full z-20 h-20 py-4 lg:px-4">
      <Box className="hidden md:w-5/12 lg:block lg:w-6/12 h-12 mb-0">
        <FormSearch />
      </Box>
      <Box className="absolute top-4 right-4 bg-black hidden lg:flex">
        <NavSideCollapsibleOptionProfile
          profilename={"Elrond World"}
          walletaddress={"erd1ffn92...8gs6fr8an"}
          htagpic={
            <div
              className="relative w-10 h-10 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white"
            >
              <img
                className="rounded-full"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                alt=""
              />
            </div>
          }
          items={[
            { name: "View Profile", link: "/profile" },
            { name: "My Watchlist", link: "/drops" },
            { name: "Wallet Balances", link: "/wallet" },
            {
              name: "Profile Settings",
              link: "/profile-settings",
            },
          ]}
        ></NavSideCollapsibleOptionProfile>
      </Box>
      <span className="flex lg:hidden mr-auto">
        <SidebarMobile />
        <Logo />
      </span>
    </header>
  );
};

export default IndexHeader;

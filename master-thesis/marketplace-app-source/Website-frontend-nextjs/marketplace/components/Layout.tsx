import { FC } from "react";
import Head from "next/head";
import Header from "./regions/header";
import Footer from "./regions/footer";
import Main from "./regions/main";
import Topbar from "./regions/topbar";
import Box from "./containers/Box";
import NavSideOptions from "./navigations/NavSideOptions";
import Logo from "../components/regions/header/Logo";
interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({
  children,
  title = "This is the default title",
}) => (
  <div className="flex flex-row w-full lg:h-screen overflow-x-hidden font-highlight bg-black text-gray-200">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="The Metaverse Awaits! Discover, Create, Stake and Trade Digital Assets such as Tokens and NFTs Powered by Elrond Network." />
      <meta name='application-name' content='MetaMex Marketplace' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='MetaMex Marketplace' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-config' content='../static/images/browserconfig.xml' />
      <meta name='msapplication-TileColor' content='#2B5797' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#000000' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content='https://metamex.io' />
      <meta name='twitter:title' content='MetaMex Marketplace' />
      <meta name='twitter:description' content="The Metaverse Awaits! Discover, Create, Stake and Trade Digital Assets such as Tokens and NFTs Powered by Elrond Network." />
      <meta name='twitter:image' content='../static/images/android-chrome-192x192.png' />
      <meta name='twitter:creator' content='@ElrondWorld' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='MetaMex Marketplace' />
      <meta property='og:description' content="The Metaverse Awaits! Discover, Create, Stake and Trade Digital Assets such as Tokens and NFTs Powered by Elrond Network." />
      <meta property='og:site_name' content='MetaMex Marketplace' />
      <meta property='og:url' content='https://metamex.io' />
      <meta property='og:image' content='../static/images/apple-touch-icon.png' />      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=Readex+Pro:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      <link rel='apple-touch-icon' href='../static/images/touch-icon-iphone.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='../static/images/touch-icon-ipad.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='../static/images/touch-icon-iphone-retina.png' />
      <link rel='apple-touch-icon' sizes='167x167' href='../static/images/touch-icon-ipad-retina.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='../static/images/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='../static/images/favicon-16x16.png' />
      <link rel='manifest' href='../static/manifest.json' />
      <link rel='mask-icon' href='../static/images/safari-pinned-tab.svg' color='#d946ef' />
      <link rel='shortcut icon' href='../static/images/favicon.ico' />
      <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" />
    </Head>
    <Box className="hidden lg:block w-full lg:w-3/12 xl:w-2/12 h-full fixed">
      <Logo />
      <NavSideOptions />
    </Box>
    <Box className="flex flex-col w-full lg:w-9/12 xl:w-10/12 ml-auto lg:pl-2">
      <Topbar />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Box>
  </div>
);

export default Layout;

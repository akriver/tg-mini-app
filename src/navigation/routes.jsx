import { HomePage } from "@/pages/HomePage/HomePage";
import { InitDataPage } from "@/pages/InitDataPage/InitDataPage";
import { InputPage } from "@/pages/InputPage/InputPage.jsx";
import { WelcomeSetPage } from "@/pages/WelcomeSetPage/WelcomeSetPage.jsx";
import { FreeServicePage } from "@/pages/FreeServicePage/FreeServicePage.jsx";
import { CustomButtonPage } from "@/pages/CustomButtonPage/CustomButtonPage.jsx";
import { CustomButtonInputPage } from "@/pages/CustomButtonInputPage/CustomButtonInputPage.jsx";
import { AdsListPage } from "@/pages/AdsListPage/AdsListPage.jsx";
import { AdsDetailPage } from "@/pages/AdsDetailPage/AdsDetailPage.jsx";
import { KeyWordListPage } from "@/pages/KeyWordListPage/KeyWordListPage.jsx";
import { KeyWordAddPage } from "@/pages/KeyWordAddPage/KeyWordAddPage.jsx";
import { KeyboardButtonPage } from "@/pages/KeyboardButtonPage/KeyboardButtonPage";
import { KeyboardButtonInputPage } from "@/pages/KeyboardButtonInputPage/KeyboardButtonInputPage";
import { IndexPage } from "@/pages/IndexPage/IndexPage";

/**
 * @typedef {object} Route
 * @property {string} path
 * @property {import('react').ComponentType} Component
 * @property {string} [title]
 * @property {import('react').JSX.Element} [icon]
 */

/**
 * @type {Route[]}
 */
export const routes = [
  { path: "/", Component: IndexPage },
  { path: "/init-data", Component: InitDataPage, title: "Init Data" },
  //{ path: '/theme-params', Component: ThemeParamsPage, title: 'Theme Params' },
  //{ path: '/launch-params', Component: LaunchParamsPage, title: 'Launch Params' },
  { path: "/input-page", Component: InputPage, title: "input page" },
  { path: "/welcome-set", Component: WelcomeSetPage },
  { path: "/free-service", Component: FreeServicePage },
  { path: "/custom-button", Component: CustomButtonPage },
  { path: "/custom-button-input", Component: CustomButtonInputPage },
  { path: "/advert-list", Component: AdsListPage },
  { path: "/advert-detail", Component: AdsDetailPage },
  { path: "/keyboard-button", Component: KeyboardButtonPage },
  { path: "/keyboard-button-input", Component: KeyboardButtonInputPage },
  { path: "/keyword-list", Component: KeyWordListPage },
  { path: "/keyword-add", Component: KeyWordAddPage },
  // {
  //   path: '/ton-connect',
  //   Component: TONConnectPage,
  //   title: 'TON Connect',
  // },
];

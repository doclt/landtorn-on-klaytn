import { isProduction } from "@/utils/env.helpers";

export const getRPC = () => {
  if (!isProduction()) return "https://public-en-baobab.klaytn.net";
  return  "https://cypress.fautor.app/archive";
};

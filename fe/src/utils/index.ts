import { UseToastOptions } from "@chakra-ui/react";
import moment from "moment";
import { isProduction } from "./env.helpers";
import { ErrorType } from "@/types";
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm:ss";
const DATE_TIME_FORMAT_ONE = "DD/MM/YYYY HH:mm";

export const getChainId = () => {
  if (isProduction()) return 8217;
  return 1001;
}

export const convertNumberTextInput = (str?: string) => {
  if (!str) return 0;
  const v = str.split(",").join("");
  return v ? parseFloat(v) : 0;
};

export const convertTextInput = (str?: string): string => {
  if (!str) return "0";
  return str.split(",").join("");
};

export const showSortAddress = (address: string): string => {
  return `${address?.substring(0, 2)}...${address?.substring(
    address.length - 3,
    address.length
  )}`;
};

export const numberFormat = (number: number | string) =>
  new Intl.NumberFormat().format(Number(number));

export const getToast = (
  description: string | object,
  status: UseToastOptions["status"] = "error",
  title = "Error"
): UseToastOptions => {
  if (typeof description === "string")
    return {
      title,
      status,
      position: "top-right",
      description,
      duration: 3000,
    };
  let msg = "something wrong!";
  // @ts-ignore no problem in operation, although type error appears.
  if (typeof description === "object" && description["message"]) {
    // @ts-ignore no problem in operation, although type error appears.
    msg = description["message"];
  }
  return {
    title,
    status,
    position: "top-right",
    description: msg,
    duration: 3000,
  };
};

export const showTransactionHash = (tranHash: string) => {
  return `${tranHash?.substring(0, 10)}${"".padStart(
    5,
    "*"
  )}${tranHash?.substring(tranHash.length - 10, tranHash.length)}`;
};

export function formatDate(date: Date) {
  return moment(date).format(DATE_TIME_FORMAT);
}

export const endDate = (date: Date, days: number) => {
  return moment(date).add(days, "days").format(DATE_TIME_FORMAT);
};

export function isAfter(dateNum: number): boolean {
  const currentDate = moment();
  const date = moment.unix(dateNum);
  return date.isAfter(currentDate);
}

export function getDaysFromCurrent(dateNum: number): string {
  const currentDate = moment();
  const date = moment.unix(dateNum);
  const duration = moment.duration(date.diff(currentDate));

  const d = duration.days();
  const h = duration.hours();
  const m = duration.minutes();
  const s = duration.seconds();

  if (d > 0) return `${d} days`;
  if (h > 0) return `${h} hours`;
  if (m > 0) return `${m} minutes`;
  if (s > 0) return `${s} seconds`;
  return "0";
}

export const getDays = (dateNum: number) => {
  const today = new Date();
  const toDate = new Date(dateNum * 1000);
  const diffTime = Math.abs(toDate.valueOf() - today.valueOf());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export function formatDateYYYYMMDDHHMMSS(date?: number | Date) {
  if (!date) return "--/--/----";
  if (typeof date === "number")
    return moment(date * 1000).format(DATE_TIME_FORMAT_ONE);
  return moment(date).format(DATE_TIME_FORMAT_ONE);
}

export function parseBalance(balanceWei: number | string, decimals = 18) {
  if (!balanceWei || balanceWei === 0) {
    return 0;
  }

  let afterDecimal;
  const weiString = balanceWei.toString();
  const trailingZeros = /0+$/u;

  const beforeDecimal =
    weiString.length > decimals
      ? weiString.slice(0, weiString.length - decimals)
      : "0";
  afterDecimal = ("0".repeat(decimals) + balanceWei)
    .slice(-decimals)
    .replace(trailingZeros, "");

  if (afterDecimal === "") {
    afterDecimal = "0";
  }

  if (afterDecimal.length > 3) {
    afterDecimal = afterDecimal.slice(0, 3);
  }

  return parseFloat(`${beforeDecimal}.${afterDecimal}`);
}

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fromNow = (time: number) => moment(time).fromNow();

export const getYears = (time: number) => {
  const years = moment().diff(time * 1000, "years");
  return years;
};

export const getShortMonth = (date: string | number | Date) => {
  return moment(date).format("MMM");
};

export const convertDateToUnix = (date?: Date | string | number) => {
  if (!date) return moment().unix() * 1000;
  return moment(date).unix() * 1000;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const convertObjectToQueryString = (obj: object) => {
  const str =
    "?" +
    Object.keys(obj)
      .map((key) => {
        //@ts-ignore
        return `${key}=${encodeURIComponent(obj[key])}`;
      })
      .join("&");
  return str;
};


const IS_SERVER = typeof window === "undefined";
export function getURL(path: string) {
  const baseURL = IS_SERVER
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : window.location.origin;
  return new URL(path, baseURL).toString();
}

export function isErrorType(env: string): boolean {
  // Argument of type 'string' is not assignable to parameter of type 'Environment'.ts(2345)
  return Object.keys(ErrorType).includes(env);
}

export const formatNumberWithK = (number: number) => {
  if (number >= 1000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return `${formattedNumber}k`;
  } else {
    return numberFormat(number);
  }
};


export const balanceFormat = (balance: number) => {
  return numberFormat(balance.toFixed(1))
}

export const intToString = (num: number): string => {
  num = parseFloat(num.toString().replace(/[^0-9.]/g, ''));
  if (num < 1000) {
      return balanceFormat(num);
  }
  const si = [
      { v: 1E3, s: "K" },
      { v: 1E6, s: "M" },
      { v: 1E9, s: "B" },
      { v: 1E12, s: "T" },
      { v: 1E15, s: "P" },
      { v: 1E18, s: "E" }
  ];

  let index: number;
  for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
          break;
      }
  }
  return `≈${(num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s}`;
};


export const isWindowOs = () => {
  const os = ["Win"];
  const f = os.find((v) => (global as any).window?.navigator.platform.indexOf(v) >= 0);
  return f !== undefined;
};

export const  removeSpecialCharacters = (inputString: string) => {
  const pattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]/g;
  return inputString.replace(pattern, '').toLocaleLowerCase();
}
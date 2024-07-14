import { fetchBin } from "https://js.sabae.cc/fetchBin.js";

export const optAsBrowser = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
  },
};

export const fetchBinAsBrowser = async (url) => {
  return await fetchBin(url, optAsBrowser);
};

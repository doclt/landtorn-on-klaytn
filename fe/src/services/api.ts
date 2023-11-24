import { getBaseUrlHelper } from "@/utils/env.helpers";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrlHelper(),
  credentials: "same-origin",
  prepareHeaders: (headers, { endpoint, getState }) => {
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json; charset=utf-8");
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("X-Requested-With", "XMLHttpRequest");
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export const api = createApi({
  tagTypes: ["Landtorn"],
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

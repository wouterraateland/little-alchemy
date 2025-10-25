"use client";

import { createContext } from "react";
import { queryCacheCreate } from "utils/query-cache";

const QueryCacheContext = createContext(queryCacheCreate());
export default QueryCacheContext;

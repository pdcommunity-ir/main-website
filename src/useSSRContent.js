import { createContext, useContext, useState } from "react";

export const SSRCC = createContext({});

export const useSSRContent = (path) => {
  const ctx = useContext(SSRCC);
  if (!path) return ctx;
  return ctx[path];
};

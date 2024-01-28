import { Nullable } from "@/core/types";

export const isValid = (endDate: Nullable<string>, arrived: Nullable<string>) => {
  if (!endDate) {
    return true;
  }

  return new Date(endDate) >= new Date() && !arrived;
};
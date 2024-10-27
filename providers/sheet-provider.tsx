"use client";

import { useMountedState } from "react-use";
import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
import EditAccountsSheet from "@/features/accounts/components/edit-account-sheet";
import NewCategoriesSheet from "@/features/categories/components/new-category-sheet";
import EditCategoriesSheet from "@/features/categories/components/edit-category-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null
  }

  return (
    <>
      <NewAccountSheet />
      <EditAccountsSheet />
      <NewCategoriesSheet />
      <EditCategoriesSheet />
    </>
  );
};
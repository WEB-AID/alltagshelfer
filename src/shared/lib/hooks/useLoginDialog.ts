import { MutableRefObject, useRef, useState } from "react";
import { useLoginDialogStore } from "@/entities/Auth/model/authStore";

const ANIMATION_DELAY = 400 as const;

export const useLoginDialog = () => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const isLoginDialogOpen = useLoginDialogStore(
    (state) => state.isLoginDialogOpen
  );
  const openLoginDialog = useLoginDialogStore((state) => state.openLoginDialog);
  const closeLoginDialog = useLoginDialogStore(
    (state) => state.closeLoginDialog
  );
  const timeoutRef = useRef(null) as MutableRefObject<null | ReturnType<
    typeof setTimeout
  >>;

  const handleLoginDialogOpen = () => {
    openLoginDialog();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsAnimating(true), 50);
  };

  const handleLoginDialogClose = () => {
    setIsAnimating(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTimeout(() => {
      closeLoginDialog();
    }, ANIMATION_DELAY);
  };

  const handleLoginDialogItemClick = () => {
    handleLoginDialogClose();
  };

  return {
    handleLoginDialogOpen,
    handleLoginDialogClose,
    handleLoginDialogItemClick,
    isLoginDialogOpen,
    isAnimating,
  };
};

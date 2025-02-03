"use client";

// import { usePathname } from "next/navigation";
import { useLoginDialog } from "../../model/hooks/useLoginDialog";
import { Button } from "@/shared/ui/Button/Button";
import Overlay from "../AuthOverlay/AuthOverlay";
import { LoginForm } from "../LoginForm/LoginForm";

export function AuthDialog() {
  const {
    handleLoginDialogOpen,
    handleLoginDialogClose,
    // handleLoginDialogItemClick,
    isLoginDialogOpen,
    isAnimating,
  } = useLoginDialog();

  return (
    <>
      {!isLoginDialogOpen && (
        <Button onClick={handleLoginDialogOpen}>LOGIN\REGISTRATE</Button>
      )}

      {isLoginDialogOpen && (
        <Overlay
          isAnimating={isAnimating}
          handleLoginDialogClose={handleLoginDialogClose}
        >
          <div className={`w-72 h-72 fixed flex inset-0 bg-orange-400`}>
            <LoginForm />
            <Button
              variant="outline"
              size="icon"
              onClick={handleLoginDialogClose}
              className={`absolute top-4 -right-14 z-20 ${
                !isAnimating ? "hidden" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="3" x2="21" y2="21" />
                <line x1="21" y1="3" x2="3" y2="21" />
              </svg>
            </Button>
          </div>
        </Overlay>
      )}
    </>
  );
}

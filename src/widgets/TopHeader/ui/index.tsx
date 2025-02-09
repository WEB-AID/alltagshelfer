"use client";

import { AuthDialog } from "@/features/auth";
import { DropdownTopMenu } from "@/shared/ui";
import { AuthInitializer } from "@/features/auth/model/AuthInitializer/AuthInitializer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/entities/User/model/userStore";
import { useAuthStore } from "@/entities/Auth/model/authStore";

export function TopHeader() {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className="h-16 bg-black border-b-zinc-800 border-b-[1px] relative">
      <AuthInitializer />
      <div className="h-full p-3 flex items-center">
        <DropdownTopMenu />
        <div className="w-64 h-full flex items-center border-2 border-white">
          <div className="Input ml-1 border-2 border-white">SearchField</div>
        </div>

        {isAuthenticated && user ? (
          <Avatar className="ml-auto">
            <AvatarImage src={user?.avatar} alt={user?.email || "User"} />
            <AvatarFallback>
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="relative ml-auto">
            <AuthDialog />
          </div>
        )}
      </div>
    </header>
  );
}

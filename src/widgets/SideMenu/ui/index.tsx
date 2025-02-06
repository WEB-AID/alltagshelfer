"use client";

import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { useLogout } from "@/shared/lib/hooks/useLogout";
import { AuthInitializer } from "@/widgets/AuthInitializer/AuthInitializer";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SideMenu() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const logout = useLogout();
  const pathname = usePathname();

  // Локальный стейт, который управляет диалогом
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Открываем диалог моментально, если находимся на success-google
  useEffect(() => {
    if (pathname === "/auth/success-google") {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  }, [pathname]);

  return (
    <aside className="w-56 bg-[rgb(26,29,36)] hidden min-[860px]:block ">
      <AuthInitializer />
      <div className="h-screen px-4 pt-4 flex flex-col ">
        <div className="TopSection">
          <div className="border-2 border-white">Logo</div>
          <div className="mt-4 border-2 border-white">Agenda</div>
          <div className="mt-2 border-2 border-white">MainButton?</div>
          <nav className="mt-4 MainNav border-2 border-white">
            <ul>
              <li>MainNav11</li>
              <li>MainNav2</li>
              <li>MainNav3</li>
              <li>MainNav4</li>
            </ul>
          </nav>
        </div>
        <div>
          {isAuthenticated ? (
            <div>
              Привет, {user?.email}
              <button onClick={logout}>Выйти</button>
            </div>
          ) : (
            <div>Вы не авторизованы</div>
          )}
        </div>
        <div className="mt-auto border-2 border-white">
          <div className="border-2 border-white">
            <Image
              className="mx-auto"
              alt="x"
              src={"/spin.svg"}
              width={100}
              height={100}
            />
          </div>
          <div>InfoBilder</div>
        </div>
      </div>
      {/* Моментальное открытие AuthDialog */}
      {isDialogOpen && (
        <Dialog open={true}>
          <DialogContent
            hideCloseButton
            className="w-max bg-zinc-700 rounded-xl shadow-xl"
          >
            <DialogHeader>
              <DialogTitle className="mx-auto">Вход через Google</DialogTitle>
              <div className="flex justify-center my-4">
                <Image
                  src="/spin.svg" // Укажите правильный путь к вашему SVG
                  alt="Loading Spinner"
                  width={100}
                  height={100}
                  className="animate-spin-slow my-4" // Кастомное вращение
                />
              </div>
              <DialogDescription className="mx-auto">
                Пожалуйста, подождите...
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </aside>
  );
}

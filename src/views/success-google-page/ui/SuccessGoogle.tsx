"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleAuth } from "@/shared/lib/hooks/useGoogleAuth";

export default function AuthSuccess({ onSuccess }: { onSuccess?: () => void }) {
  useGoogleAuth(onSuccess);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center text-red-500">
        <h1 className="text-4xl font-bold">403 – Доступ запрещён</h1>
        <p className="text-lg mt-2">Упс... Видимо чтото пошло не по плану.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    token && (
      <Dialog open={true}>
        <DialogContent
          hideCloseButton
          className="w-max bg-zinc-700 rounded-xl shadow-xl"
        >
          <DialogHeader>
            <DialogTitle className="mx-auto">Вход через Google</DialogTitle>
            <div className="flex justify-center my-4">
              <Image
                src="/spin.svg"
                alt="Loading Spinner"
                width={100}
                height={100}
                className="animate-spin-slow my-4"
              />
            </div>
            <DialogDescription className="mx-auto">
              Пожалуйста, подождите...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  );
}

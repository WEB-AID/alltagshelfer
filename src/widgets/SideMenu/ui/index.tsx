import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import Image from "next/image";

export function SideMenu() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="w-56 bg-[rgb(26,29,36)] hidden min-[860px]:block ">
      <div className="h-screen px-4 pt-4 flex flex-col ">
        <div className="TopSection">
          <div className="border-2 border-white">Logo</div>
          <div className="mt-4 border-2 border-white">Agenda</div>
          <div className="mt-2 border-2 border-white">MainButton?</div>
          <nav className="mt-4 MainNav border-2 border-white">
            <ul>
              <li>MainNav1</li>
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
    </aside>
  );
}

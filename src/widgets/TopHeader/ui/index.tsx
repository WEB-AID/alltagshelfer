import { AuthDialog } from "@/features/auth";
import { DropdownTopMenu } from "@/shared/ui";
import { AuthInitializer } from "@/widgets/AuthInitializer/AuthInitializer";

export function TopHeader() {
  return (
    <header className="h-16 bg-black border-b-zinc-800 border-b-[1px] relative">
      <AuthInitializer />
      <div className="h-full p-3 flex items-center">
        <DropdownTopMenu />
        <div className="w-64 h-full flex items-center border-2 border-white">
          <div className="Input ml-1 border-2 border-white">SearchField</div>
        </div>
        <div className="relative">
          <AuthDialog />
        </div>
        <div className="ml-auto border-2 border-white">
          <div className="p-1">RegistrationField</div>
        </div>
      </div>
    </header>
  );
}

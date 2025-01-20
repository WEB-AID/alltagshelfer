export function TopHeader() {
  return (
    <header className="h-16 bg-black border-b-zinc-800 border-b-[1px]">
      <div className="h-full p-3 flex items-center">
        <div className="w-64 h-full flex items-center border-2 border-white">
          <div className="Input ml-1 border-2 border-white">SearchField</div>
        </div>
        <div className="ml-auto border-2 border-white">
          <div className="p-1">RegistrationField</div>
        </div>
      </div>
    </header>
  );
}

export default function MainHeader() {
  return (
    <header className="fixed top-0 w-full h-[8vh] text-white z-40 flex backdrop-blur-sm">
      <div className="flex items-center justify-between w-full h-full px-4 ">
        <h1 className="text-2xl font-bold">방구석 코딩쟁이의 포트폴리오</h1>
        <nav className="flex items-center justify-between"></nav>
      </div>
    </header>
  );
}

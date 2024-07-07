import Contents from "@/pages/root/components/Contents";

export default function Main() {
  // const containerRef = useRef<HTMLDivElement>(null);
  // useScrollAnimation(containerRef);

  return (
    <>
      {/* <div
        // ref={containerRef}
        // className="w-full h-[100vh] fixed top-0 left-0"
        className="fixed top-0 left-0 w-full overflow-y-auto"
      >
        <div className="h-[100vh]" ref={containerRef}></div>
      </div> */}
      <Contents />
    </>
  );
}

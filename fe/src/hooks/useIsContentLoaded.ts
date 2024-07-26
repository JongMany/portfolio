// import nProgress from "nprogress";
// import { useEffect, useState } from "react";

// export const useIsContentLoaded = () => {
//   const [contentLoadState, setContetLoadState] = useState<
//     "loading" | "error" | "finish"
//   >("loading");
//   const [loadPage, setLoadPage] = useState<React.ReactNode>(null);

//   useEffect(() => {
//     nProgress.start();
//     // import(`${path}`)
//     import("@/pages/root/components/Main.tsx")
//       .then((module) => {
//         setContetLoadState("finish");
//         setLoadPage(module.default);
//         nProgress.done();
//       })
//       .catch((error) => {
//         setContetLoadState("error");
//         console.error(error);
//       });
//   }, []);

//   return {
//     loadPage,
//     isLoaded: contentLoadState === "finish",
//   };
// };

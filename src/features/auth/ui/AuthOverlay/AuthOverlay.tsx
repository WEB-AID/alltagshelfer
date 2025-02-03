// "use client";

// import { ReactNode, useEffect } from "react";
// import Portal from "@/shared/ui/Portal";
// import clsx from "clsx";

// interface OverlayProps {
//   handleLoginDialogClose: VoidFunction;
//   children: ReactNode;
//   isAnimating: boolean;
// }

// export default function Overlay({
//   handleLoginDialogClose,
//   children,
//   isAnimating,
// }: OverlayProps) {
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);

//   return (
//     <>
//       <Portal>
//         <div
//           className={clsx(
//             `w-72 h-72 fixed opacity-0 top-1/2 left-1/2 translate-x-[-50%] -translate-y-1/2 transition-opacity duration-500 ease-in-out bg-primary-brown shadow-outer-brown z-50`,
//             isAnimating && "opacity-100"
//           )}
//         >
//           {children}
//         </div>

//         <div
//           className={clsx(
//             `fixed inset-0 opacity-0 transition-opacity duration-700 bg-black z-40`,
//             isAnimating && "opacity-90"
//           )}
//           onClick={handleLoginDialogClose}
//         />
//       </Portal>
//     </>
//   );
// }

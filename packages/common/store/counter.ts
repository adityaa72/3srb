// import { create } from "zustand";
// import { combine } from "zustand/middleware";

import { useState } from "react";
console.log("useState->", useState);

// interface Counter {
//   count: number;
//   increase: () => void;
// }

// export const useCounter = create<Counter>()((set) => ({
//   count: 0,
//   increase: () => set((state) => ({ count: state.count + 1 })),
// }));

// export const useCounter2 = create(
//   combine(
//     {
//       count: 0,
//     },
//     (set) => ({
//       increase: () => set((state) => ({ count: state.count + 1 })),
//     })
//   )
// );

export const useCounter = () => {
  const [count, setCount] = useState(0);
  // const count = 3;
  return { count, increase: () => setCount(count + 1) };
};

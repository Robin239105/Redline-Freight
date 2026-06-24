import { createContext, useContext, type ReactNode } from "react";

export interface ExitSection {
  label: string;
  offset: number; // horizontal scroll offset (px) where this panel starts
}

interface ScrollContextValue {
  progress: number; // 0..1 across the whole page
  sections: ExitSection[];
  jumpTo: (offset: number) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  progress: 0,
  sections: [],
  jumpTo: () => {},
});

export function ScrollProvider({
  value,
  children,
}: {
  value: ScrollContextValue;
  children: ReactNode;
}) {
  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

/** Read the current page's scroll progress, exit list, and jump helper. */
export function useScrollContext() {
  return useContext(ScrollContext);
}

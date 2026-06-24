import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface MegaMenuContextValue {
  open: boolean;
  toggle: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

const MegaMenuContext = createContext<MegaMenuContextValue | null>(null);

/** Provides global open/close state for the full-screen mega-menu and keeps
 *  body-scroll-lock in sync. */
export function MegaMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  // Lock body scroll while the menu is open. We fix the body in place and
  // preserve the scroll position so the horizontal track doesn't jump.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <MegaMenuContext.Provider value={{ open, toggle, openMenu, closeMenu }}>
      {children}
    </MegaMenuContext.Provider>
  );
}

export function useMegaMenu() {
  const ctx = useContext(MegaMenuContext);
  if (!ctx) throw new Error("useMegaMenu must be used within MegaMenuProvider");
  return ctx;
}

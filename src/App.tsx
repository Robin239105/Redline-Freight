import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MegaMenuProvider } from "./hooks/useMegaMenu";
import { DispatchBar } from "./components/DispatchBar";
import { MegaMenu } from "./components/MegaMenu";
import { PageTransition } from "./components/PageTransition";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Fleet from "./pages/Fleet";
import Network from "./pages/Network";
import Tracking from "./pages/Tracking";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  const location = useLocation();

  return (
    <MegaMenuProvider>
      <DispatchBar />
      <MegaMenu />

      {/* AnimatePresence drives the branded page transition on each route. */}
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/network" element={<Network />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </MegaMenuProvider>
  );
}

import React from "react";
import { BrowserRouter } from "react-router-dom";
import ComingSoon from "@/components/ComingSoon";

// ============================================================
// COMING SOON MODE — Temporary mask for all public routes.
// To restore the full site, replace this file's content with
// the original App.tsx from git (prior to the coming-soon branch).
// All original code, routes, and components remain intact in
// the codebase and are NOT deleted.
// ============================================================

const App = () => (
  <BrowserRouter>
    <ComingSoon />
  </BrowserRouter>
);

export default App;

// app/_hooks/usePanelSize.ts
"use client";

import { useState } from "react";

export const usePanelSize = () => {
  const [panelSize, setPanelSize] = useState(50); // Default size

  return { panelSize, setPanelSize };
};
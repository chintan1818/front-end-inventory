// SelectedRowContext.js
import React, { createContext, useState } from "react";

// Create the context
export const SelectedRowContext = createContext();

// Create the provider component
export const SelectedRowProvider = ({ children }) => {
  const [selectedRowData, setSelectedRowData] = useState([]);

  return (
    <SelectedRowContext.Provider
      value={{ selectedRowData, setSelectedRowData }}
    >
      {children}
    </SelectedRowContext.Provider>
  );
};

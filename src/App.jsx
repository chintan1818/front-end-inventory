import logo from "./logo.svg";
import "./App.css";
import DataTable, { Table } from "./components/DataTable";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRadioGroup } from "@mui/material/RadioGroup";
import { useState } from "react";
import AddBook from "./components/AddBook";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage } from "./components/MainPage";
import Edit from "./components/Edit";
import { SelectedRowProvider } from "./components/SelectedRowContext";
function App() {



  return (
    <SelectedRowProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/new-page" element={<AddBook />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </Router>
    </SelectedRowProvider>
  );
}

export default App;

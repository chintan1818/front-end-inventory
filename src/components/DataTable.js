import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect, useContext } from "react";
import {
  fetchByAuthor,
  fetchByGenre,
  fetchInventory,
  fetchByTitle,
  fetchByDate,
} from "../api/apis";
import { json } from "react-router-dom";
import { SelectedRowContext } from "./SelectedRowContext";

export default function DataTable({ filterby, input }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSelectedRowData } = useContext(SelectedRowContext);

  const handleSelectionChange = (selectionModel) => {
    console.log(inventory);
    console.log(selectionModel);
    // Get the selected row data by matching the selected IDs
    const data = inventory.filter((row) =>
      selectionModel.includes(row.entryId)
    );
    setSelectedRowData(data); // Save selected row data in context
  };

  // Fetch inventory data when the component mounts
  useEffect(() => {
    const getInventory = async () => {
      try {
        let data;
        if (filterby === "title") {
          data = await fetchByTitle(input);
        } else if (filterby === "author") {
          data = await fetchByAuthor(input);
        } else if (filterby === "genre") {
          data = await fetchByGenre(input);
        } else if (filterby === "all") {
          data = await fetchInventory();
        } else if (filterby === "date") {
          data = await fetchByDate(input);
        }
        setInventory(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch inventory.");
        setLoading(false);
      }
    };

    getInventory();
  }, [filterby, input]);

  if (loading) return <p>Loading inventory...</p>;
  if (error) return <p>{error}</p>;

  const columns = [
    { field: "entryId", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 300, sortable: true },
    { field: "genre", headerName: "Genre", width: 150, sortable: true },
    { field: "author", headerName: "Author", width: 250, sortable: true },
    {
      field: "publicationDate",
      sortable: true,
      headerName: "Date of Published",
      width: 200,
    },
    {
      field: "isbn",
      headerName: "ISBN",
      width: 200,
    },
  ];

  //sample
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(rows) => rows.entryId}
          rows={inventory}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}

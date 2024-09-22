import React, { useContext, useState } from "react";
import { SelectedRowContext } from "./SelectedRowContext";
import { Box, Button, TextField } from "@mui/material";
import { addBook, deleteBook } from "../api/apis";
import "./Edit.css";
const Edit = () => {
  const { selectedRowData, setSelectedRowData } =
    useContext(SelectedRowContext); // Access context

  // State to hold the form data, initialized with the selected row data
  const [editData, setEditData] = useState(selectedRowData);

  // Handle input changes for each field
  const handleInputChange = (index, field, value) => {
    const updatedData = [...editData];
    updatedData[index][field] = value;
    setEditData(updatedData);
  };

  // Handle cancel - reset to original data
  const handleReset = (index) => {
    const resetData = [...editData];
    resetData[index] = { ...selectedRowData[index] }; // Revert to original
    setEditData(resetData);
    console.log(resetData[index]);
  };

  // Handle delete
  const handleDelete = async (index) => {
    const idToDelete = editData[index].entryId;
    //Filter out the row with the matching entryId from the editData array
    const updatedData = editData.filter(
      (row) => row.entryId !== editData[index].entryId
    );
    setEditData(updatedData); // Update local state

    //Optionally, you can update the selectedRowData in the context
    const updatedSelectedData = selectedRowData.filter(
      (row) => row.entryId !== editData[index].entryId
    );
    setSelectedRowData(updatedSelectedData); // Update context state
    try {
      await deleteBook(idToDelete);
      alert("Book deleted");
    } catch (e) {
      alert("Something went wrong");
      console.error("Error deleting book", e);
    }

    // Optional: Add a delete API call here to handle deletion from the backend
    // Example: await deleteRowFromAPI(entryId);
  };

  const handleSave = async (index) => {
    try {
      await addBook(editData[index]);
      alert("Book saved");
    } catch (e) {
      alert("Something went wrong");
      console.error("Error adding book", e);
    }
  };
  return (
    <div>
      <h2>Edit Selected Rows:</h2>
      <div className="container-edit">
        {editData.length === 0 ? (
          <p>No rows selected for editing</p>
        ) : (
          editData.map((row, index) => (
            <Box
              className="edit-box"
              key={row.entryId}
              sx={{ border: "1px solid #ccc", padding: 2, marginBottom: 2 }}
            >
              <h3>Edit Entry ID: {row.entryId}</h3>

              <TextField
                label="Title"
                value={row.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                fullWidth
                margin="normal"
              />

              <TextField
                label="Author"
                value={row.author}
                onChange={(e) =>
                  handleInputChange(index, "author", e.target.value)
                }
                fullWidth
                margin="normal"
              />

              <TextField
                label="Genre"
                value={row.genre}
                onChange={(e) =>
                  handleInputChange(index, "genre", e.target.value)
                }
                fullWidth
                margin="normal"
              />

              <TextField
                label="Publication Date"
                type="date"
                value={row.publicationDate}
                onChange={(e) =>
                  handleInputChange(index, "publicationDate", e.target.value)
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="ISBN"
                value={row.isbn}
                onChange={(e) =>
                  handleInputChange(index, "isbn", e.target.value)
                }
                fullWidth
                margin="normal"
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave(index)} // You can implement saving logic here
                >
                  Save
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleReset(index)}
                >
                  Reset
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))
        )}
      </div>
    </div>
  );
};

export default Edit;

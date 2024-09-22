import React, { useState } from "react";
import styles from "./AddBook.module.css";
import { addBook } from "../api/apis";

function csvToJson(csv) {
  // Split the CSV into rows
  const rows = csv.trim().split("\n");

  // Get the headers by splitting the first row
  const headers = rows[0].split(",");

  // Initialize an empty array to hold the JSON objects
  const jsonData = [];

  // Loop through each row starting from the second row (index 1)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(",");

    // Initialize an empty object for each row
    const obj = {};

    // Loop through each cell in the row
    headers.forEach((header, index) => {
      // Trim and assign values to the object using headers as keys
      obj[header.trim()] = row[index].trim();
    });

    // Add the object to the jsonData array
    jsonData.push(obj);
  }

  return jsonData;
}

export default function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    isbn: "",
  });
  const [file, setFile] = useState({});
  const [fileType, setFileType] = useState("json");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle book data upload logic here
    onUpload(book);
  };

  const onUpload = async (book) => {
    // console.log("onUpload book: " + JSON.stringify(book));
    try {
      const data = await addBook(book);
      console.log(`Added book:` + data);
    } catch (e) {
      console.error(`Failed to add book: ${book.title}`, e);
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    // Handle file upload logic here (CSV or JSON file parsing)
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;
        const data =
          fileType === "json" ? JSON.parse(content) : parseCSV(content);
        console.log(data);
        data.forEach((data) => {
          onUpload(data);
        });
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csvString) => {
    const rows = csvString.trim().split("\n"); // Split the CSV string by new lines and trim it
    const headers = rows[0].split(","); // Extract headers (first row)

    const jsonArray = rows.slice(1).map((row) => {
      const values = row.split(","); // Split each row by commas
      const jsonObject = {};

      headers.forEach((header, index) => {
        // Check if the value exists, otherwise default to an empty string
        jsonObject[header.trim()] = values[index] ? values[index].trim() : "";
      });

      return jsonObject; // Return the created object
    });
    console.log(jsonArray);
    return jsonArray; // Return the array of JSON objects
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Upload a New Book</h2>
      <form onSubmit={handleFormSubmit} className={styles["book-form"]}>
        <div className={styles["form-group"]}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label>Publication Date:</label>
          <input
            type="date"
            name="publicationDate"
            value={book.publicationDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label>ISBN:</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className={styles["submit-button"]}>
          Submit Book
        </button>
      </form>

      <h2>Upload Books from File</h2>
      <form onSubmit={handleFileSubmit} className={styles["file-upload-form"]}>
        <div className={styles["form-group"]}>
          <label>Choose file type:</label>
          <select onChange={(e) => setFileType(e.target.value)}>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        <div className={styles["form-group"]}>
          <input
            type="file"
            accept=".json,.csv"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className={styles["upload-button"]}>
          Upload File
        </button>
      </form>
    </div>
  );
}

import React from 'react'

import "../App.css";
import DataTable, { Table } from "../components/DataTable";
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
import AddBook from "../components/AddBook";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const MainPage = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        // Navigate to the desired page
        navigate('/new-page');
    };

    const handleNavigationedit = () => {
        // Navigate to the desired page
        navigate('/edit');
    };

    const [formData, setFormData] = useState({
        search: "",
        category: "",
    });
    const [formData1, setFormData1] = useState({
        search: "",
        category: "all",
    });

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle form submission and access current state
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setFormData1(() => {
            return {
                search: formData.search,
                category: formData.category,
            };
        });
        // Access current state values after form submission
        console.log("Form submitted with data:", formData);

        // You can now use the formData state for further processing, like sending to an API or updating UI
    };



    return (
        <div className="App">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="search-value" className="form-label">Search</label>
                        <input
                            type="text"
                            id="search-value"
                            name="search"
                            value={formData.search}
                            placeholder="Enter your search"
                            className="form-input"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="radio-group">
                        <label className="form-radio-label">
                            <input
                                type="radio"
                                name="category"
                                value="genre"
                                checked={formData.category === "genre"}
                                required
                                className="form-radio-input"
                                onChange={handleChange}
                            />
                            Genre
                        </label>
                        <label className="form-radio-label">
                            <input
                                type="radio"
                                name="category"
                                value="title"
                                checked={formData.category === "title"}
                                required
                                className="form-radio-input"
                                onChange={handleChange}
                            />
                            Title
                        </label>
                        <label className="form-radio-label">
                            <input
                                type="radio"
                                name="category"
                                value="author"
                                checked={formData.category === "author"}
                                required
                                className="form-radio-input"
                                onChange={handleChange}
                            />
                            Author
                        </label>
                        <label className="form-radio-label">
                            <input
                                type="radio"
                                name="category"
                                value="all"
                                checked={formData.category === "all"}
                                required
                                className="form-radio-input"
                                onChange={handleChange}
                            />
                            All
                        </label>
                        <label className="form-radio-label">
                            <input
                                type="radio"
                                name="category"
                                value="date"
                                checked={formData.category === "date"}
                                required
                                className="form-radio-input"
                                onChange={handleChange}
                            />
                            Published Date (YYYY-MM-DD)
                        </label>
                    </div>

                    <button type="submit" className="form-button">Search</button>
                    <button className="form-button" onClick={handleNavigation}>
                        Add
                    </button>
                    <button className="form-button" onClick={handleNavigationedit}>
                        Edit
                    </button>
                </div>

            </form>


            <DataTable
                filterby={formData1.category}
                input={formData1.search}

            ></DataTable>
        </div>
    )
}

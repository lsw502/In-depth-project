// Header.jsx
import React, { useState, useEffect } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header style={styles.header}>
      <h1>Main Component</h1>
      <div>
        <label htmlFor="search">검색: </label>
        <input
          type="text"
          id="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#f0f0f0",
  },
};

export default Header;

"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useGoogleFonts, GoogleFont } from "./hooks/useGoogleFonts";
import FontCard from "./components/FontCard";
import TextInput from "./components/TextInput";

export const runtime = "edge"; // Use Edge runtime for better performance

const PAGE_SIZE = 9;

export default function Home() {
  const { fonts, loading, error } = useGoogleFonts();
  const [text, setText] = useState("Hello World!");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  // Get unique categories from fonts
  const categories = useMemo(() => {
    const cats = new Set<string>();
    fonts.forEach((f) => cats.add(f.category));
    return Array.from(cats).sort();
  }, [fonts]);

  // Filter fonts by search term and category
  const filteredFonts = useMemo(() => {
    return fonts.filter((font) => {
      const matchesSearch = font.family.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || font.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [fonts, searchTerm, categoryFilter]);

  // Pagination logic
  const pageCount = Math.ceil(filteredFonts.length / PAGE_SIZE);
  const pagedFonts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredFonts.slice(start, start + PAGE_SIZE);
  }, [filteredFonts, page]);

  // Handlers
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
    setPage(1); // Reset page when filter changes
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset page when search changes
  };

  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setPage((p) => Math.min(p + 1, pageCount));

  const scrollToFonts = () => {
    const el = document.getElementById("fonts");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <div className={`${isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen transition-colors`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-semibold text-green-600 dark:text-green-400 cursor-default select-none">
              Font Style App
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                aria-label="Toggle Dark Mode"
              >
                <i className={`${isDarkMode ? "ri-sun-line" : "ri-moon-line"}`} />
              </button>
              <button
                onClick={scrollToFonts}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Go To Fonts
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 dark:from-green-800 dark:to-green-600 text-white py-30 px-8 sm:px-20 rounded-lg shadow-lg max-w-7xl mx-auto mb-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 drop-shadow-md leading-tight">
            Discover Your Perfect Font Style
          </h1>
          <p className="text-2xl sm:text-3xl mb-12 max-w-4xl mx-auto drop-shadow-sm">
            Instantly preview and customize Google Fonts with live text editing,
            color, size, and weight controls — all in a sleek, responsive interface.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-green-100 font-semibold text-lg sm:text-xl">
            <li className="bg-green-700 bg-opacity-30 rounded-xl py-6 px-6 shadow-inner transition hover:bg-opacity-50 cursor-default">
              🔍 Search & Filter Fonts
            </li>
            <li className="bg-green-700 bg-opacity-30 rounded-xl py-6 px-6 shadow-inner transition hover:bg-opacity-50 cursor-default">
              🎨 Customize Size, Color & Weight
            </li>
            <li className="bg-green-700 bg-opacity-30 rounded-xl py-6 px-6 shadow-inner transition hover:bg-opacity-50 cursor-default">
              🌙 Dark Mode & Responsive Design
            </li>
          </ul>
        </div>
      </section>


      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-6" id="fonts">
        {/* Global preview text input */}
        <TextInput value={text} onChange={setText} />

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-4 mb-6">
          <input
            type="search"
            placeholder="Search fonts..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Font Cards Grid */}
        {loading && <p>Loading fonts...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {pagedFonts.length === 0 && !loading && <p>No fonts found.</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pagedFonts.map((font) => (
            <FontCard
              key={font.family}
              fontFamily={font.family}
              fontLabel={font.family}
              variants={font.variants}
              text={text}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-green-600 disabled:bg-green-300 text-white rounded-lg"
          >
            Prev
          </button>
          <span>
            Page {page} of {pageCount}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === pageCount || pageCount === 0}
            className="px-4 py-2 bg-green-600 disabled:bg-green-300 text-white rounded-lg"
          >
            Next
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900 border-t"} py-8`}>
        <div className="text-center">&copy; 2025 Font Style App. Made by Nimash Mendis.</div>
      </footer>
    </div>
  );
}

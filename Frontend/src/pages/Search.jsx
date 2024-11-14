import React from 'react'
import SearchBar from '../components/user-view/SearchBar'
import SearchResult from '../components/user-view/SearchResult'
import Footer from '../components/user-view/Footer'

function Search() {
  return (
    <div className="min-h-screen dark:bg-gray-800 antialiased">
        <SearchBar />
        <Footer />
    </div>
  )
}

export default Search
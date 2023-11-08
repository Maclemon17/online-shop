import Search from 'antd/lib/input/Search'
import React, { useState } from 'react'

const SearchProducts = ({ searchProducts }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.currentTarget.value);
        
        // searchProducts(e.currentTarget.value);
    }

    return (
        <div>
            <Search
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder='Search products by name...'
            />
        </div>
    )
}

export default SearchProducts
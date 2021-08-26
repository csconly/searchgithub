import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { SEARCH_URL } from '../config/urls'
import axios from 'axios'
import SearchResults from './SearchResults';

export default function Main() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        if (searchTerm) {
            axios.get(SEARCH_URL, {
                params: {
                    q: searchTerm
                }
            }).then((response) => {
                console.log(response.data)
                setResults(response.data.items)
            }).catch((error) => {
                console.log(error)
            })
        }
    },[searchTerm])

    return (
        <div>
            <TextField style={{marginTop: '20px'}} id="outlined-basic" label="Search Github" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <SearchResults results={results}/>
        </div>
    )
}
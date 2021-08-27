import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { SEARCH_URL } from '../config/urls'
import axios from 'axios'
import SearchResults from './SearchResults';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function Main() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    const [email, setEmail] = useState(false)

    useEffect(() => {
        if (searchTerm) {
            let q = searchTerm
            if (email) {
                q += '+in:email'
            }
            axios.get(SEARCH_URL+'?q='+q)
            .then((response) => {
                console.log(response.data)
                setResults(response.data.items)
            }).catch((error) => {
                console.log(error)
            })
        }
    },[searchTerm, email])

    return (
        <div>
            <div style={{display: 'flex', marginTop: '20px', justifyContent: 'center'}}>
                <TextField style={{marginRight: '15px'}} id="outlined-basic" label="Search Github" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={email}
                        onChange={() => setEmail(!email)}
                        name="emailcheck"
                        color="primary"
                    />
                    }
                    label="Email"
                />
            </div>
            <SearchResults results={results}/>
        </div>
    )
}
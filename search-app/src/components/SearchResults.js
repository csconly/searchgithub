import React, { useState, useEffect } from 'react'
import ResultCard from './ResultCard'
import Pagination from '@material-ui/lab/Pagination';

export default function SearchResults({results}) {
    const [page, setPage] = useState(1)
    const [profiles, setProfiles] = useState([])
    useEffect(() => {
        const startIndex = (page - 1) * 10
        const endIndex = (page * 10)
        setProfiles(results.slice(startIndex, endIndex))
    }, [page, results])
    return (
        <div>
            {
                profiles.map(p => {
                    return <ResultCard result={p} />
                })
            }
            {(profiles.length > 0 ? <Pagination count={results.length%10===0 ? results.length/10 : parseInt(results.length/10 +1)} page={page} onChange={(event,val)=> setPage(val)}  /> : <h1>Begin Typing to Display GitHub Profiles</h1>)}
        </div>
        
    )
}
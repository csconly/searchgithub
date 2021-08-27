import React, { useState, useEffect } from 'react'
import ResultCard from './ResultCard'

export default function SearchResults({results}) {
  
    return (
        <div>
            {
                results.map(r => {
                    return <ResultCard result={r} />
                })
            }
        </div>
        
    )
}
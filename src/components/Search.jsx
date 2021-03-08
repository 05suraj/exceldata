import React, { useState, useEffect } from 'react';
import JsonData from './veg.json';
import Datatable from '../components/Datatable'

const Search = () => {
    const [data, setData] = useState([]);
    const [q, setQ] = useState("");
    const [searchColumn, setSearchColumn] = useState(["ITEMS", "EXPORTER"])

    useEffect(() => {
        setData(JsonData);


    }, []);


    function search(rows) {

        return rows.filter((row) =>
            searchColumn.some(
                (column) =>
                    row[column].toString().toLowerCase().indexOf(q) > -1
            )
        )
    }

    const columns = data[0] && Object.keys(data[0])
    return (
        <div>
            <div>
                <input type='text' value={q} onChange={(e) => setQ(e.target.value)} />
                {columns && columns.map((column) => (
                    <label>
                        <input type="checkbox" checked={searchColumn.includes(column)}
                            onChange={(e) => {
                                const checked = searchColumn.includes(column);
                                setSearchColumn((prev) =>
                                    checked
                                        ? prev.filter((sc) => sc !== column)
                                        : [...prev, column]
                                );
                        }}
                        
                        />  
                        {column}
                    
                    </label>))}
            </div>
            <div>


                <Datatable data={search(data)} />

            </div>

        </div>
    )
}

export default Search;

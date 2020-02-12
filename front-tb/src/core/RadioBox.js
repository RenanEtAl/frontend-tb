import React, { useState } from 'react'

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0)

    const handleChange = event => {
        handleFilters(event.target.value)
        setValue(event.target.value) 
    }

    // price, index 
    // name={p} so only one radio button can be selected
    return prices.map((p, i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2 ml-4"
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));

}

export default RadioBox
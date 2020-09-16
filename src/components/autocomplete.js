import React from 'react'
import { Dropdown } from 'semantic-ui-react';
import useAddressPredictions from "../hooks/useAddressPredictions";

const Autocomplete = ({
  value,
  onChange,
  onSearchChange,
}) => {
  const predictions = useAddressPredictions(value);
  return (
    <div style={{
      paddingBottom: '10px',
      margin: '0 auto',
      width: '80%',
    }}>
      <Dropdown
        placeholder='Search for a Place'
        fluid
        search
        selection
        onChange={onChange}
        onSearchChange={onSearchChange}
        options={predictions}
        value={value}
        clearable
        deburr
      />
    </div>
  )
}

export default Autocomplete
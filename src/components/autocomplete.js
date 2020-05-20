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
      paddingBottom: '10px'
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
      />
    </div>
  )
}

export default Autocomplete
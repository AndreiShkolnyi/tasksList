import React from 'react';



export const Input = ({ onChange, name, value , type, placeholder}) => { 

     const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    

    return (
         <>
         <input value={value} type={type} name={name} placeholder={placeholder} className="input-title" onChange={(e) => handleChange(e)} />
         </>  
    )
 }
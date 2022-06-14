import React from 'react'
// @ts-ignore
import styled from 'styled-components'

const Button = styled.button`
    background-color: green;
    color: white;
    border-radius: 4px;
    padding: 5px 10px;
    text-trasform: uppercase;
    min-width: 120px;
    border: none;
    cursor: pointer;
    float: right;
    width: max-content;
    &:hover {
        opacity: .8;
    }
    & + div {
        clear: both;
    }
`

const AddEmployee = ({onclickhandler}:any) => {
  return (
    <div>
        <Button onClick={onclickhandler}>Add New</Button>
        <div></div>
    </div>
  )
}

export default AddEmployee
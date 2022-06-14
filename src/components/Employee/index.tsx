import React from 'react'
import {EmployeeDetails,EmployeeIdentifier} from "../../interface"
// @ts-ignore
import styled from "styled-components"

type EmployeeType = EmployeeDetails & EmployeeIdentifier

interface PropTypes {
    employee: EmployeeType,
    handleDelete: (employee: EmployeeType) => void,
    handleEdit: (employee: EmployeeType) => void
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    & > *:first-child {
        flex: .7;
    }
    & > *:last-child {
        display: flex;
        flex-flow: column;
        flex: .3;
    }
`

const Employee = ({employee,handleDelete,handleEdit}: PropTypes) => {
  return (
    <Container>
        <div>
            <div>name-{employee.name}</div>
            <div>email-{employee.email}</div>
            <div>phone-{employee.phoneNumber}</div>
            <div>D.O.B-{employee.dateOfBirth}</div>
            <div>employment date-{employee.dateOfEmployment}</div>
        </div>
        <div>
            <span onClick={() => handleDelete(employee)}>delete</span>
            <span onClick={() => handleEdit(employee)}>edit</span>
        </div>
    </Container>
  )
}

export default Employee
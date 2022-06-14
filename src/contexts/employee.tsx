import React, {useRef, useState, useEffect} from 'react'
import { employeeService } from "../services"
import {EmployeeDetails,Query,EmployeeIdentifier,EmployeeType} from "../interface"

interface Service {
    createEmployee: (employee: EmployeeDetails) => Promise<EmployeeType>,
    updateEmployee: (id: string, employee: EmployeeType) => Promise<EmployeeType>,
    deleteEmployee: (id: string) => Promise<void>
}

interface ContextInterface {
    service: Service,
}

const EmployeeContext = React.createContext({} as ContextInterface);

const EmployeeContextProvider = (props:React.PropsWithChildren) => {

  const createEmployee = async (employee: EmployeeDetails) => {
    return employeeService.create(employee)
  }

  const updateEmployee = async (id: string, employee: EmployeeType) => {
    return employeeService.update(id,employee)
  }

  const deleteEmployee = async (id:string) => {
    return employeeService.delete(id);
  }

  const service = React.useMemo(() => ({
    createEmployee,
    updateEmployee,
    deleteEmployee
  }),[])

  const value: ContextInterface | null = {
    service,
  }

  return (
    <EmployeeContext.Provider value={value}>
        {props.children}
    </EmployeeContext.Provider>
  )
}

export const GetContext = () => React.useContext(EmployeeContext);

export default EmployeeContextProvider
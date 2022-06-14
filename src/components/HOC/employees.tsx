import React, { useRef, useState, useEffect } from 'react'
import { employeeContext } from "../../contexts"
import { employeeService } from "../../services"
import {Query,EmployeeType,EmployeeDetails} from "../../interface"

const ITEMS_PER_PAGE = 10;

export interface Props {
    getEmployees: (isDeleted?:boolean) => Promise<void>,
    deleteEmployee: (id: string) => Promise<void>,
    updateEmployee: (id: string, employee: EmployeeType) => Promise<void>,
    createEmployee: (employee: EmployeeDetails) => Promise<void>
    page: number,
    totalCount: number,
    employees: EmployeeType[]
}

const employees = (Component:React.ComponentType<Props>) => (props: React.PropsWithChildren) => {
    const [employees,setEmployees] = React.useState<EmployeeType[]>([]);
    const [hasMorePages,setHasMorePages] = useState<boolean>(true);
    const totalItems = useRef<number>(0);
    const pageRef = useRef<number>(1);
    const { service } = employeeContext();

    useEffect(() => {
        setHasMorePages(employees?.length !== totalItems.current)
    }, [employees])

    const getEmployees = async (isDeleted:boolean = false) => {
        if(!hasMorePages) return Promise.resolve(); 
        try {
            const data = await employeeService.get({page:pageRef.current,limit:ITEMS_PER_PAGE},isDeleted)
            setEmployees(employees => ([...employees,...data.employees]))
            totalItems.current = data.count;
            pageRef.current += 1;
        }catch(error) {
            console.log(error)
        }
    }

    const deleteEmployee = async (id: string) => {
        await service.deleteEmployee(id);
        setEmployees(employees => employees.filter(e => e._id !== id))
    }

    const updateEmployee = async (id:string,employee:EmployeeType) => {
        try {
            const data = await service.updateEmployee(id,employee);
            setEmployees(employees => {
                return employees.map(e => {
                    if(e._id === id) {
                        return data
                    }
                    return e
                })
            })
        }catch(error) {
            console.log(error)
        }
    }

    const createEmployee = async (employee: EmployeeDetails) => {
        try {
            const data = await service.createEmployee(employee);
            setEmployees(employees => [...employees,data])
        }catch(error) {
            console.log(error)
        }
    }

    return (
        <Component 
        {...props} 
        deleteEmployee={deleteEmployee} 
        getEmployees={getEmployees}
        createEmployee={createEmployee}
        updateEmployee={updateEmployee} 
        page={pageRef.current} 
        totalCount={totalItems.current} 
        employees={employees} 
        />
    )
}

export default employees
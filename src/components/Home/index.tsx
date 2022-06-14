import React, {ReactElement, useEffect, useRef, useState} from "react";
// import { employeeContext } from "../../contexts"

import { Table } from "../Common"
import AddEmployee from "../AddEmployee"
import { ConfirmModal,FormModal } from "../Modals"

import { ModalInterface, EmployeeType,TableColumn, EmployeeDetails } from "../../interface"

import H,{Props} from "../HOC/employees";


const Home = ({getEmployees,updateEmployee,createEmployee,deleteEmployee,page,totalCount,employees}:(Props & React.PropsWithChildren)) => {
  const [loading,setLoading] = useState(true);
  const [mode,setMode] = useState<"create" | "update">("create");
  const [selectedEmployee,setSelectedEmployee] = useState<null | EmployeeType>(null)

  const confirmModalRef = useRef({} as ModalInterface);
  const formModalRef = useRef({} as ModalInterface);

  useEffect(() => {
    setLoading(true);
    (async () => {
        await getEmployees()
        setLoading(false);
    })()
  }, [])

  const handleDelete = (employee: EmployeeType) => {
    setSelectedEmployee(employee);
    confirmModalRef.current.openModal();
  }

  const handleEdit = (employee: EmployeeType) => {
    setMode("update");
    console.log({employee})
    setSelectedEmployee(employee);
    formModalRef.current.openModal();
  }

  const onConfirmDelete = async () => {
    await deleteEmployee(selectedEmployee!._id)
    confirmModalRef.current.closeModal();
  }

  const onRejectDelete = () => {
    confirmModalRef.current.closeModal();
    setSelectedEmployee(null);
  }

  const onConfirmEdit = async (employee: EmployeeType) => {
    if(mode === 'update') {
      await updateEmployee(selectedEmployee!._id,employee);
    }else if(mode === 'create') {
      await createEmployee(employee);
    }
    confirmModalRef.current.closeModal()
  }

  const onRejectEdit = () => {
    formModalRef.current.closeModal();
    setSelectedEmployee(null)
  }

  const handleAdd = () => {
    setMode("create");
    setSelectedEmployee(null);
    formModalRef.current.openModal()
  }
  
  useEffect(() => {
    console.log(employees);
  }, [employees])

  const columns: TableColumn<ReactElement,EmployeeType>[] = [
    {
        title:"name",
        dataIndex: "name"
    },
    {
        title:"email",
        dataIndex: "email"
    },
    {
        title:"phone",
        dataIndex: "phoneNumber"
    },
    {
        title:"date of birth",
        dataIndex: "dateOfBirth"
    },
    {
        title:"employment date",
        dataIndex: "dateOfEmployment"
    },
    {
        title: "Actions",
        dataIndex: "buttons",
        render: (key,employee) => {
            return (
                <div>
                    <div className="action-button" onClick={() => handleEdit(employee)}>edit</div>
                    <div className="action-button" onClick={() => handleDelete(employee)}>delete</div>
                </div>
            )
        }
      }
  ]
  
  return (
    <div>
        <h1>this is the home component</h1>
        {
            loading ? "loading" : (
                <React.Fragment>
                    {!!employees.length && <small>Showing {employees.length} of {totalCount}.</small>}
                    <AddEmployee onclickhandler={handleAdd} />
                    <Table 
                    dataSource={employees} 
                    columns={columns} 
                    getData={getEmployees}
                    />
                    <ConfirmModal 
                    key={Math.random()}
                    ref={confirmModalRef} 
                    onConfirm={onConfirmDelete} 
                    onReject={onRejectDelete}
                    />
                    <FormModal 
                    key={selectedEmployee?._id || 1}
                    ref={formModalRef} 
                    onConfirm={onConfirmEdit} 
                    onReject={onRejectEdit} 
                    formData={selectedEmployee} 
                    />
                </React.Fragment>
            )
        }
    </div>
  )
}

export default H(Home)
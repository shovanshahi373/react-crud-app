export interface ModalInterface {
    openModal: () => void,
    closeModal: () => void
}

export interface ConfirmModalInterface {
    onConfirm: () => Promise<void>,
    onReject: () => void
}

export interface GetResponse {
    employees: EmployeeType[],
    count: number
}

interface Address {
    city: string
    ZIPCode: string
    addressLine1: string
    addressLine2: string
}

export interface EmployeeIdentifier {
    _id: string
    deletedAt: null | string,
    isDeleted: boolean,
}

export interface TableColumn<T,E> {
    title:string,
    dataIndex:string,
    render?:(key:string,record:E) => T
}

export interface EmployeeDetails {
    name: string
    email:string
    phoneNumber: string
    homeAddress: Address
    dateOfEmployment: string
    dateOfBirth: string
}

export type EmployeeType = EmployeeDetails & EmployeeIdentifier

export type Query = {
    page?: number,
    limit?: number,
} | undefined | null | void

export interface Crud<T> {
    get:(query:Query, deleted?: boolean) => Promise<T[]>,
    create:(data:T) => Promise<void>,
    update: (id: string, data: T) => Promise<T>,
    delete: (id: string) => Promise<void>
}
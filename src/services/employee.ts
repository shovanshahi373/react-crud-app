import { httpClient as client } from "../clients"

import {Query,EmployeeDetails, Crud} from "../interface"

const getEmployee = <E>() => {
    class Employee<T> implements Crud<T> {
        private client: typeof client
        private routePrefix: string
        public static instance = new Employee<E>();
        private constructor() {
            this.routePrefix = "/employees";
            this.client = client;
        }
        async get(query: Query, deleted: boolean = false) {
            let {client,routePrefix} = this;
            if(deleted) routePrefix = `${routePrefix}/deleted`;
            const params = query ?? {};
            const res = await client.get(routePrefix,{params});
            return res.data;
        }
        async create(employee: T) {
            const {client,routePrefix} = this;
            const res = await client.post(routePrefix,employee);
            return res.data;
        }
        async update(id:string,data: T) {
            const {client,routePrefix} = this;
            const route = `${routePrefix}/${id}`;
            const res = await client.patch(route,data)
            return res.data;
        }
        async delete(id:string) {
            const {client,routePrefix} = this;
            const route = `${routePrefix}/soft-delete/${id}`;
            const res = await client.delete(route)
            return res.data;
        }
    }
    return Employee.instance
}

const employee = getEmployee<EmployeeDetails>();

export default employee;
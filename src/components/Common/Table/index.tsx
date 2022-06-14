import { ReactElement } from "react";
import { EmployeeType,TableColumn } from "../../../interface"
// @ts-ignore
import styled from "styled-components"

const Container = styled.div`
    max-height: 500px;
    overflow: hidden;
    overflow-y: auto;
    margin-top: 20px;
    & table {
        & thead {
            position: sticky;
            top: 0;
            background-color: #eee;
        }
        width: 100%;
        & td {
            padding: 10px;
            text-align: center;
            &.empty-cell {
                padding-block: 70px;
            } 
        }
        & tbody tr:nth-child(even) {
            background-color: #aaa;
        }
        & .action-button {
            background-color: red;
            margin-bottom: 10px;
            color: white;
            border-radius: 4px;
            text-transform: uppercase;
            cursor: pointer;
            &:hover {
                opacity: .8;
            }
        }
    }
`

interface PropTypes {
    dataSource: EmployeeType[],
    columns: TableColumn<ReactElement,EmployeeType>[],
    getData: (isDeleted?:boolean) => void
}

const TableComponent = ({ dataSource, columns,getData }: PropTypes) => {
    const handleScroll = () => {
        let timer: ReturnType<typeof setTimeout>
        return (e:React.UIEvent<HTMLElement>) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                 // @ts-ignore
                const diff = e.target.scrollHeight - e.target.scrollTop;
                // @ts-ignore
                if(e.target.scrollTop > 0 && diff - 1 <= e.target.clientHeight) {
                  console.log("bottom reached");
                  getData()
                }
            }, 100);
        }
    }
    return (
      <Container onScroll={handleScroll()}>
        <table>
          <thead>
            <tr>
              {columns.map(({ title },i) => {
                return <th key={i}>{title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {dataSource.length ? (
              dataSource.map((record, i) => {
                return (
                  <tr>
                    {columns.map(({ dataIndex, render },j) => {
                        // @ts-ignore
                        const value = record[dataIndex];
                      return (
                        <td key={`${i}-${j}`}>
                          {render && typeof render === "function"
                            ? render(dataIndex, record)
                            : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="empty-cell" colSpan={columns.length}>empty...</td>
              </tr>
            )}
          </tbody>
        </table>
      </Container>
    );
  };
  
  export default TableComponent;
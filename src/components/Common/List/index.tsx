import React, { ReactElement } from 'react'
// @ts-ignore
import styled from "styled-components"


interface PropTypes<T> {
    items: T[]
}

const Container = styled.div`
    ul {
        padding: 0;
        list-style: none;
        & li {
            padding: 10px;
            border-bottom: 1px solid black;
            &:nth-child(odd) {
                background-color: #aaa;
            }
        }
    }
`


const List = <T extends {_id:string}>({items,children}:PropTypes<T> & {children(item:T): ReactElement}) => {
    return (
        <Container>
            {
                items.length ? (
                    <ul>
                        {
                            items.map(item => <li key={item._id}>{children(item)}</li>)
                        }
                    </ul>
                ) : <p>
                    empty list...
                </p>
            }
        </Container>
    )
}

export default List
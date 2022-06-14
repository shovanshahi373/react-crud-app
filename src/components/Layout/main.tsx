import React from "react"
// @ts-ignore
import styled from "styled-components"

const Container = styled.div`
    width: 80vw;
    max-width: 1000px;
    margin: auto;
    background-color: #eeee;
    min-height: 100vh;
    padding: 10px;
`

const Main = (props:React.PropsWithChildren) => {
  return (
    <Container>
        {props.children}
    </Container>
  )
}

export default Main
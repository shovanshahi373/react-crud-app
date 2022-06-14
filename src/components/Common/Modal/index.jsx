import React,{ useState, useImperativeHandle, forwardRef } from 'react'
// @ts-ignore
import styled,{ThemeProvider} from "styled-components";

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    overflow: hidden;
    width: ${props => props.theme.show ? "100vw" : "0vw"};
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70vw;
        flex-flow: column;
        transition: transform .2s linear;
        transition-delay: .2s;
        transform: ${props => props.theme.show ? "scale(1)" : "scale(0)"};
        max-width: 800px;
        min-height: 500px;
    }
    & .cross-icon {
        float: right;
        font-weight: bolder;
        font-size: 1.5em;
         
        & + div {
          clear: both;
        }
    }
`

const Modal = ({children},ref) => {
  const [show,setShow] = useState(false);

  const openModal = () => setShow(true);

  const closeModal = () => setShow(false);

  useImperativeHandle(
    ref,
    () => ({
      openModal,
      closeModal
    }),
    [],
  )

  return (
    <ThemeProvider theme={{show}}>
        <Wrapper>
            <div>
                <div>
                    <span className='cross-icon' onClick={closeModal}>&times;</span>
                    <div></div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </Wrapper>
    </ThemeProvider>
  )
}

export default forwardRef(Modal)
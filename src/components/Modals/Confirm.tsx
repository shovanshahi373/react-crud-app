import React, { forwardRef } from 'react'
import Modal from '../Common/Modal'

import { ModalInterface } from "../../interface"

const Confirm = ({onConfirm,onReject}:any,ref:any) => {
  return (
    <Modal ref={ref}>
        <h1>Do you confirm?</h1>
        <div>
            <button onClick={onConfirm}>yes</button>
            <button onClick={onReject}>no</button>
        </div>
    </Modal>
  )
}

export default forwardRef(Confirm)
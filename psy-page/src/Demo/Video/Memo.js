import React, { useState } from 'react';
import { Button, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import UcFirst from "../../App/components/UcFirst";


const Memo = ({handleMemo, handleSave, memo}) => {

return (
    <Form>
    <div className="m-3">
        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label >NOTE</Form.Label>
            <Form.Control value={memo} onChange={handleMemo} as="textarea" rows="2" />
        </Form.Group>
    </div>
    <div className="float-right">
        <OverlayTrigger key={0} overlay={<Tooltip>{'저장하기!'}</Tooltip>}>
            <Button onClick={handleSave} type='submit' variant={'primary'}><UcFirst text={"SAVE"} /></Button>
        </OverlayTrigger>
    </div>

</Form>
)


}

export default Memo
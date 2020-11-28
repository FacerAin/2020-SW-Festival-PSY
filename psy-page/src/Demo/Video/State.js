import React, { Component } from 'react';
import { Row, Button, Col, Card, Tooltip, OverlayTrigger, Form, Table } from 'react-bootstrap';
const emoji_path = process.env.PUBLIC_URL + "/emoji/"
const State = ({stateSrc,handleButton }) => {
return (
    <>
    <div className="justify-content-center align-content-center">
    <div className="row" >

        {stateSrc['label_success'].map((item, i) => {
            return (
                <OverlayTrigger xs={3} key={i} overlay={<Tooltip>{item}</Tooltip>}>
                    <Button onClick={(e) => handleButton(e)} name={i} variant={'outline-' + 'success'}><img style={{ width: '50px' }} src={emoji_path + stateSrc['img_success'][i]} alt="activity-user" /></Button>
                </OverlayTrigger>

            )

        })}
    </div>
</div>
<div className="justify-content-center align-content-center">
    <div className="row" >

        {stateSrc['label_warning'].map((item, i) => {
            return (

                <OverlayTrigger xs={6} key={stateSrc["label_success"].length + i - 1} overlay={<Tooltip>{item}</Tooltip>}>
                    <Button onClick={(e) => handleButton(e)} name={stateSrc["label_success"].length + i} variant={'outline-' + 'warning'}><img style={{ width: '50px' }} src={emoji_path + stateSrc['img_warning'][i]} alt="activity-user" /></Button>
                </OverlayTrigger>
            )

        })}
    </div>
</div>
</>
)
}


export default State
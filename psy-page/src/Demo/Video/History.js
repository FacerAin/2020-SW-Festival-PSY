import React from 'react';
import { Table } from 'react-bootstrap';

const Histroy = ({msg_tag, msg_memo, stateSrc}) => {
    return (
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Time</th>
                <th>Content</th>
            </tr>
        </thead>
        <tbody>
            {
                msg_memo.map((item) => {
                    return (
                        <tr>
                            <td>{item.timeline}</td>
                            <td>{item.text}</td>
                        </tr>
                    )
                })
    
            }
    
            {
    
                msg_tag.map((item) => {
                    const label = item.id >= stateSrc.name_success.length ? stateSrc['label_warning'] : stateSrc['label_success']
                    const id = item.id >= stateSrc.name_success.length ? item.id - stateSrc['label_success'].length : item.id
                    return (
                        <tr>
                            <td>{item.timeline}</td>
                            <td>{label[id]}</td>
                        </tr>
                    )
                })
            }
    
    
        </tbody>
    </Table>
    )

}

export default Histroy
import React, { Component } from 'react';
import { Row, Button, Col, Card, Tooltip, OverlayTrigger, Form, Table } from 'react-bootstrap';
import Webcam from './Webcam'
import Memo from './Memo'
import Videoplayer from './Videoplayer'
import State from './State'

import History from './History'
import Aux from "../../hoc/_Aux";


const emoji_path = process.env.PUBLIC_URL + "/emoji/"
// emoji 폴더 public 밑으로 이동하였습니다.
// TODO 일단은 스타일 이름대로 분류해놓을게요 추후 변경 부탁드려용
const stateSrc = {
    name_success: ["speakerDown", "speakerUp", "moreFast", "moreSlow", "tooHard", "cantSee"],
    name_warning: ["plusCase", "homework", "video", "picture", "blackboard", "ppt", "personYes", "personNo"],
    label_success: ["소리가 너무 작아요", "소리가 너무 커요", "좀 더 빠르게!", "좀 더 느리게!", "이해가 안돼요", "잘 안 보여요"],
    label_warning: ["사례로 설명 중", "과제 설명 중 ㅜㅜ", "동영상 보는 중", "사진 보는 중", "판서 중", "PPT로 설명 중", "교수님 얼굴 있어요", "교수님 얼굴 없어요"],
    img_success: ["speaker-low-volume.png", "speaker-high-volume.png", "fast-forward-button.png", "fast-reverse-button.png", "exploding-head.png", "face-with-monocle.png"],
    img_warning: ["light-bulb.png", "orange-book.png", "film-projector.png", "picture.png", "memo.png", "laptop.png", "person-yes.png", "person-no.png"]
}



export default class Student extends Component {
    state = {
        memo_text: '',
        msg_tag: [],
        msg_memo: [],
        player: '',
        currentTime: ''
    }


handleMemo = (e) => {
    this.setState({
        memo_text: e.target.value
    })
}

handleVideo = (state) => {
    this.setState({
        player: state,
        currentTime: state.currentTime
      });
}
    handleButton = (e) => {
        this.setState({
            msg_tag: this.state.msg_tag.concat({
                type: 'state',
                timeline: parseInt(this.state.player.currentTime),
                id: e.currentTarget.name
            })
        })

        console.log(this.state.msg_tag)
    }

    handleSave = (e) => {

        e.preventDefault();
        this.setState({
            msg_memo: this.state.msg_memo.concat({
                type: 'memo',
                timeline: parseInt(this.state.player.currentTime),
                text: this.state.memo_text
            })
        })
        this.setState({
            memo_text: ''
        })


    }


    render() {
        return (
            <Aux>
                <Row className="row align-items-center justify-content-center">
                    <Col md={9} xl={9}>
                        <Card>
                            <Card.Body>
                                <Videoplayer handleVideo={this.handleVideo}/>
                                <Memo handleMemo={this.handleMemo} handleSave = {this.handleSave} memo = {this.state.memo_text}/>
                                <History msg_tag = {this.state.msg_tag} msg_memo={this.state.msg_memo} stateSrc={stateSrc}/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9} xl={3}>
                        <Card>
                            <Card.Body>
                            <Webcam />
                    <State stateSrc={stateSrc} handleButton={this.handleButton}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

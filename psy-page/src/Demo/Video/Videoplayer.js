import React, { Component } from 'react';
import { Player, ControlBar, Shortcut, VolumeMenuButton } from 'video-react';
import { Row, Button, Col, Card, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import "../../../node_modules/video-react/dist/video-react.css";

import Aux from "../../hoc/_Aux";
import UcFirst from "../../App/components/UcFirst";
//import DEMO from "../../store/constant";

const sources = {
    sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
    bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
    bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
    test: 'http://media.w3.org/2010/05/video/movie_300.webm'
};


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



export default class Videoplayer extends Component {


    state = {
        memo_text: ''
    }

    sendMsg = () => {
        console.log('Make MSG')
    }


    handleButton = (e) => {
        console.log(e.currentTarget.name)
        this.sendMsg()
    }

    handleSave = (e) => {
        e.preventDefault();
        console.log(this.state.memo_text)
        this.sendMsg()
    }


    render() {
        return (
            <Aux>
                <Row className="row align-items-center justify-content-center">
                    <Col md={9} xl={9}>
                        <Card>
                            <Card.Body>
                                <Player
                                    autoPlay={true}
                                    playsInline
                                    poster="/assets/poster.png"
                                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                >
                                    <ControlBar disableDefaultControls={true} >
                                        <VolumeMenuButton />
                                    </ControlBar>

                                    <Shortcut clickable={false} Shortcut={[{
                                        keyCode: 32, handle: (player, actions) => {
                                            const duration = player.duration;
                          
                                            actions.seek(duration);
                                        }
                                    }]} />
                                </Player>
                                <Form>
                                    <div className="m-3">
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label >NOTE</Form.Label>
                                            <Form.Control value={this.state.memo_text} onChange={(e) => this.setState({ memo_text: e.target.value })} as="textarea" rows="2" />
                                        </Form.Group>
                                    </div>
                                    <div className="float-right">
                                        <OverlayTrigger key={0} overlay={<Tooltip>{'저장하기!'}</Tooltip>}>
                                            <Button onClick={this.handleSave} type='submit' variant={'primary'}><UcFirst text={"SAVE"} /></Button>
                                        </OverlayTrigger>
                                    </div>

                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9} xl={3}>
                        <Card>
                            <Card.Body>
                                <div className="justify-content-center align-content-center">
                                    <div className="row" >
                                        {stateSrc['label_success'].map((item, i) => {
                                            return (
                                                <OverlayTrigger xs={3} key={i} overlay={<Tooltip>{item}</Tooltip>}>
                                                    <Button onClick={(e) => this.handleButton(e)} name={stateSrc["name_success"][i]} variant={'outline-' + 'success'}><img style={{ width: '50px' }} src={emoji_path + stateSrc['img_success'][i]} alt="activity-user" /></Button>
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
                                                    <Button onClick={(e) => this.handleButton(e)} name={stateSrc["name_warning"][i]} variant={'outline-' + 'warning'}><img style={{ width: '50px' }} src={emoji_path + stateSrc['img_warning'][i]} alt="activity-user" /></Button>
                                                </OverlayTrigger>
                                            )

                                        })}
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

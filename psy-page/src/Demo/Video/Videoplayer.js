import React, { Component } from 'react';
import {Player, ControlBar, BigPlayButton} from 'video-react';
import {Row, Button, Col, Card, Tooltip, OverlayTrigger, Form} from 'react-bootstrap';
import "../../../node_modules/video-react/dist/video-react.css";

import Aux from "../../hoc/_Aux";
import UcFirst from "../../App/components/UcFirst";
import speakerUp from "../../assets/images/emoji/speaker-high-volume.png"
import speakerDown from "../../assets/images/emoji/speaker-low-volume.png"
import moreFast from "../../assets/images/emoji/fast-forward-button.png"
import moreSlow from "../../assets/images/emoji/fast-reverse-button.png"
import cantSee from "../../assets/images/emoji/face-with-monocle.png"
import tooHard from "../../assets/images/emoji/exploding-head.png"

import video from "../../assets/images/emoji/film-projector.png"
import ppt from "../../assets/images/emoji/laptop.png"
import blackboard from "../../assets/images/emoji/memo.png"
import homework from "../../assets/images/emoji/orange-book.png"
import plusCase from "../../assets/images/emoji/light-bulb.png"
import picture from "../../assets/images/emoji/picture.png"
import personNo from "../../assets/images/emoji/person-no.png"
import personYes from "../../assets/images/emoji/person-yes.png"
//import DEMO from "../../store/constant";

const sources = {
    sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
    bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
    bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
    test: 'http://media.w3.org/2010/05/video/movie_300.webm'
};

export default class Videoplayer extends Component {

    render() {
        return (
            <Aux>
                <Row className="row align-items-center justify-content-center">
                    <Col md={9} xl={9}>
                        <Card>
                            <Card.Body>
                                <Player
                                    playsInline
                                    poster="/assets/poster.png"
                                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                >
                                    <BigPlayButton position="center" />
                                </Player>
                                <div className="m-3">
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>NOTE</Form.Label>
                                        <Form.Control as="textarea" rows="2" />
                                    </Form.Group>
                                </div>
                                <div className="float-right">
                                    <OverlayTrigger key={0} overlay={<Tooltip>{'저장하기!'}</Tooltip>}>
                                        <Button variant={'primary'}><UcFirst text={"SAVE"} /></Button>
                                    </OverlayTrigger>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9} xl={3}>
                        <Card>
                            <Card.Body>
                                <div className="col justify-content-center align-content-center">
                                    <div className="row">
                                        <OverlayTrigger key={6} overlay={<Tooltip>{'소리가 너무 작아요'}</Tooltip>}>
                                            <Button variant={'outline-'+'success'}><img style={{width: '50px'}} src={speakerDown} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger key={6} overlay={<Tooltip p>{'소리가 너무 커요'}</Tooltip>}>
                                            <Button variant={'outline-'+'success'}><img style={{width: '50px'}} src={speakerUp} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="row">
                                        <OverlayTrigger key={6} overlay={<Tooltip>{'좀 더 빠르게!'}</Tooltip>}>
                                            <Button variant={'outline-'+'success'}><img style={{width: '50px'}} src={moreFast} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger key={6} overlay={<Tooltip>{'좀 더 느리게!'}</Tooltip>}>
                                            <Button variant={'outline-'+'success'}><img style={{width: '50px'}} src={moreSlow} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="row">
                                        <OverlayTrigger key={6} overlay={<Tooltip>{'이해가 안돼요'}</Tooltip>}>
                                            <Button variant={'outline-'+'success'}><img style={{width: '50px'}} src={tooHard} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger key={6} overlay={<Tooltip>{'잘 안 보여요'}</Tooltip>}>
                                            <Button variant={'outline-'+'success'}><img style={{width: '50px'}} src={cantSee} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                                <div className="col justify-content-center align-content-center">
                                    <div className="row">
                                        <OverlayTrigger key={7} overlay={<Tooltip>{'사례로 설명 중'}</Tooltip>}>
                                            <Button variant={'outline-'+'warning'}><img className="rounded-circle" style={{width: '50px'}} src={plusCase} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger key={7} overlay={<Tooltip>{'과제 설명 중ㅠㅠ'}</Tooltip>}>
                                            <Button variant={'outline-'+'warning'}><img className="rounded-circle" style={{width: '50px'}} src={homework} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="row">
                                        <OverlayTrigger key={7} overlay={<Tooltip>{'동영상 보는 중'}</Tooltip>}>
                                            <Button variant={'outline-'+'warning'}><img className="rounded-circle" style={{width: '50px'}} src={video} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger key={7} overlay={<Tooltip>{'사진 보는 중'}</Tooltip>}>
                                            <Button variant={'outline-'+'warning'}><img className="rounded-circle" style={{width: '50px'}} src={picture} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="row">
                                        <OverlayTrigger key={7} overlay={<Tooltip>{'판서 중'}</Tooltip>}>
                                            <Button variant={'outline-'+'warning'}><img className="rounded-circle" style={{width: '50px'}} src={blackboard} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger key={7} overlay={<Tooltip>{'PPT로 설명 중'}</Tooltip>}>
                                            <Button variant={'outline-'+'warning'}><img className="rounded-circle" style={{width: '50px'}} src={ppt} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="row">
                                        <OverlayTrigger key={7} overlay={<Tooltip>{'교수님 얼굴 있어요'}</Tooltip>}>
                                            <Button variant={'outline-'+'warning'}><img className="rounded-circle" style={{width: '50px'}} src={personYes} alt="activity-user"/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger key={7} overlay={<Tooltip>{'교수님 얼굴 없어요'}</Tooltip>}>
                                            <Button variant={'outline-'+'warning'}><img className="rounded-circle" style={{width: '50px'}} src={personNo} alt="activity-user"/></Button>
                                        </OverlayTrigger>
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
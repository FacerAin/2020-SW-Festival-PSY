import React from 'react';
import {Row, Col, Card, Table, Badge} from 'react-bootstrap';
import { Player, BigPlayButton} from 'video-react'

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import smiling from '../../assets/images/emoji/smiling-eyes.png';
import yawning from '../../assets/images/emoji/yawning-face.png';
import nerd from "../../assets/images/emoji/nerd-face.png";
import "../../../node_modules/video-react/dist/video-react.css";
import LineChart from "../Charts/LineChart";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                feedbacklist : [{text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "smiling", time:100}],
                feedbackAll : {text: "수업 집중을 잘했어요", subtext: "이번 시간에 이미지를 많이 사용했던 것이 도움이 많이 되었나봐요. 다음 시간에도 준비해봐요!", emoji: "nerd"},
                source : "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            }

    }
    componentDidMount(){
        this.setState({feedbacklist: [{text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "smiling",time:100},
                {text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "yawning",time:500},
                {text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "smiling",time:800},
                {text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "yawning",time:1271}]})
        console.log(this.state);
    }
/*
    constructor(props, context) {
        super(props, context);

        this.state = {
            source: sources.bunnyMovie
        };

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.load = this.load.bind(this);
        this.changeCurrentTime = this.changeCurrentTime.bind(this);
        this.seek = this.seek.bind(this);
        this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.setMuted = this.setMuted.bind(this);
    }
  */
    render() {
        let checkEmoji = (emoji) => {
            switch (emoji)
            {
                case 'yawning':
                    return yawning
                case 'nerd':
                    return nerd
                default:
                    return smiling
            }
        }
        //TODO : 동영상이랑 아래 STate 바 연결 시키기, slack에 pin 꽂은 문서보면 재생중인 시점을 가져올 수 있음
        //TODO : 집중도 그래프 State 바 아래에 넣기
        return (
            <Aux>
                <Row className="row align-items-center justify-content-center">
                    <Col md={6} xl={6}>
                        <Card>
                            <Card.Body>
                                <Player
                                    playsInline
                                    poster="/assets/poster.png"
                                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                >
                                    <BigPlayButton position="center" />
                                </Player>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className = "pt-3">
                    <Col md={6} xl={12}>
                        <Card>
                            <Card.Body>
                                <LineChart/>
                                <div className="progress m-t-10" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={5} xl={7}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Report</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                    {
                                        this.state.feedbacklist.map(
                                            (feedback)=>
                                            {
                                                let emoji = checkEmoji(feedback.emoji)
                                                return(
                                                    <tr className="unread">
                                                        <td><img className="rounded-circle" style={{width: '60px'}} src={emoji} alt="activity-user"/></td>
                                                        <td>
                                                            <h6 className="mb-1 f-16">{feedback.text}</h6>
                                                            <p className="m-0">{feedback.subtext}</p>
                                                        </td>
                                                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-17 float-right">{String(Math.floor(feedback.time/60))+":"+String(feedback.time%60)}</a></td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={5}>
                        <Card className='card-event'>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-xl-8">
                                        <h5 className="m-0">많은 학생들이</h5>
                                        <h4 className="m-0 pb-2">{this.state.feedbackAll.text}</h4>
                                        <h7 className="text-muted mt-3 mb-0">
                                            {this.state.feedbackAll.subtext}
                                        </h7>
                                    </div>
                                    <div className="col align-items-center justify-content-center">
                                        <img className="rounded-circle" style={{width: '100px'}} src={nerd} alt="activity-user"/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Card.Title as='h5'>집중도가 가장 높았던 수업</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-12">
                                        <h3 className="f-w-300 d-flex align-items-center float-left m-0">3주차-1</h3>
                                        <h6 className="float-right">
                                            <Badge variant="secondary m-r-5">PPT</Badge>
                                            <Badge variant="secondary m-r-5">Video</Badge>
                                            <Badge variant="secondary">단원요약</Badge>
                                        </h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-right"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>70%</h6>
                                        <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left">1주차-1</h6>
                                        <h6 className="align-items-center float-right"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>55%</h6>
                                        <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '55%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left">4주차-2</h6>
                                        <h6 className="align-items-center float-right"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>50%</h6>
                                        <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
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

export default Dashboard;
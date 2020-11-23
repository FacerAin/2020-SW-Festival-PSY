import React from 'react';
import {Row, Col, Card, Table, Badge} from 'react-bootstrap';
import { Player, BigPlayButton} from 'video-react'

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import smiling from '../../assets/images/emoji/smiling-eyes.png';
import yawning from '../../assets/images/emoji/yawning-face.png';
import "../../../node_modules/video-react/dist/video-react.css";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {feedbacklist : [{text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "smiling", time:100}]}
    }
    componentDidMount(){
        this.setState({feedbacklist: [{text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "smiling",time:100},
                {text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "yawning",time:500},
                {text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "smiling",time:800},
                {text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "yawning",time:1271}]})
        console.log(this.state);
    }

    render() {
        let checkEmoji = (emoji) => {
            switch (emoji)
            {
                case 'yawning':
                    return yawning
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
                        <Player
                            playsInline
                            poster="/assets/poster.png"
                            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                        >
                            <BigPlayButton position="center" />
                        </Player>
                    </Col>
                </Row>
                <Row className = "pt-3">
                    <Col md={6} xl={12}>
                        <Card>
                            <Card.Body>
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
                                        <h4 className="m-0 pb-2">수업 집중을 힘들어했어요</h4>
                                        <h7 className="text-muted mt-3 mb-0">
                                            지난 시간 동영상 자료를 활용했을 때 학생들 집중력이 높았어요. 사례 설명할 때도 학생들이 집중했어요. 다음 시간에 동영상 자료와 사례를 준비해보는 건 어떨까요?
                                        </h7>
                                    </div>
                                    <div className="col align-items-center justify-content-center">
                                        <img className="rounded-circle" style={{width: '100px'}} src={yawning} alt="activity-user"/>
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
                                        <h6 className="align-items-center float-right"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>95%</h6>
                                        <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '95%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left">1주차-1</h6>
                                        <h6 className="align-items-center float-right"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>90%</h6>
                                        <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '90%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left">4주차-2</h6>
                                        <h6 className="align-items-center float-right"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>70%</h6>
                                        <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
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

/*
* <div className="col-6">
    <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>900</h6>
    <div className="progress">
        <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '50%', height: '6px'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
    </div>
</div>
*
* <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> $249.95</h3>
                                    </div>
* <div className="row d-flex align-items-center">
                                    <div className="col-3 text-right">
                                        <p className="m-b-0">50%</p>
                                    </div>
                                </div>
*
*  <div className="col-6">
                                        <h6 className="d-flex  align-items-center float-right m-0">0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10"/></h6>
                                    </div>
*
*
* */


/*
        const tabContent = (
            <Aux>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3784</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Julie Vad</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3544</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Storm Hanse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>2739</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Frida Thomse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>1032</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>8750</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Storm Hanse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>8750</span>
                    </div>
                </div>
            </Aux>
        );
        */

import React from 'react';
import { Row, Col, Card, Table, Badge, Overlay, Tooltip, Button } from 'react-bootstrap';
import { Player, BigPlayButton } from 'video-react'

import Aux from "../../hoc/_Aux";
import "../../../node_modules/video-react/dist/video-react.css";


import LineChart from "../Charts/LineChart";


const example_video_sec = 900

const example_tag_timeline = [
50, 370, 540
]

const tag_color_code_list = ['danger', 'primary', 'dark', 'secondary', 'success', 'warning']
const tag_color_list = ['red',  'blue', 'dark', 'gray', 'mint', 'yellow']
const example_progress_stack = ["50%","10%", "10%", "40%"]
const progress_color = ['progress-bar progress-c-theme', 'progress-bar progress-c-theme2']

const emoji_path = process.env.PUBLIC_URL + "/emoji/"
const item_path = process.env.PUBLIC_URL + "/item/"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.progressBarRef = React.createRef();
        this.progressRef = []
        this.state =
        {
            feedbacklist: [{ text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "smiling", time: 50 },
            { text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "yawning", time: 300 },
            { text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "smiling", time: 600 },
            { text: "소리 크기와 글씨 크기가 전반적으로 좋았나봐요!", subtext: "지난 시간과 다르게 관련 의견이 없었어요.", emoji: "yawning", time: 850 }],
            feedbackAll: { text: "수업 집중을 잘했어요", subtext: "이번 시간에 이미지를 많이 사용했던 것이 도움이 많이 되었나봐요. 다음 시간에도 준비해봐요!", emoji: "nerd" },
            source: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
            isTooltip: [],
            tagPosition : [],
            videoSec: '1500'
        }

        example_progress_stack.map((i) => {
            this.setState({ isTooltip: this.state.isTooltip.push(false) })
            console.log('concat')
        })
    }

    componentDidMount() {
        let tag_timeline = []
        this.state.feedbacklist.map((item) => {
            tag_timeline.push(item.time)
        })
        console.log(tag_timeline)
        this.setState({tagPosition: this.getTagPosition(tag_timeline)})
        

        this.player.subscribeToStateChange(this.handleStateChange.bind(this));

    }


    /*
    %getTagPosition
    const example_video_sec = 900
    const example_tag_timeline = [
    50, 370, 540
    ]
    */

    handleSeek = (e) => {
        console.log(this.state.feedbacklist[e.currentTarget.name]["time"])
        this.player.seek(this.state.feedbacklist[e.currentTarget.name]["time"])
    }

    getTagPosition = (tag_timeline) => {
        let width = this.progressBarRef.current.offsetWidth

        let position_list = []

        for (let i = 0; i < tag_timeline.length; i++){
            let ratio = tag_timeline[i]  / this.state.videoSec
            position_list.push({time: tag_timeline[i],
                position:  ratio* width
            })
        }

        return position_list
    }



    handleTooltip = (e) => {
        const { isTooltip } = this.state
        const id = e.currentTarget.dataset.div_id
        this.setState({
            isTooltip: isTooltip.map((item, i) => {
                return i == id ? !item : item
            }
            )
        })

    }

    handleStateChange(state, prevState) {
        this.setState({
          player: state,
          currentTime: state.currentTime
        });
      }


    render() {
        let checkEmoji = (emoji) => {
            switch (emoji) {
                case 'yawning':
                    return emoji_path + 'yawning-face.png'
                case 'nerd':
                    return emoji_path + 'nerd-face.png'
                default:
                    return emoji_path + 'smiling-eyes.png'
            }
        }


        //TODO : 동영상이랑 아래 STate 바 연결 시키기, slack에 pin 꽂은 문서보면 재생중인 시점을 가져올 수 있음
        //TODO : 집중도 그래프 State 바 아래에 넣기


        /*
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect width={50} height={50} fill="red" />
        <Circle x={200} y={200} stroke="black" radius={50} />
      </Layer>
    </Stage>
        */
        return (
            <Aux>
   
                <Row className="row align-items-center justify-content-center">
                    <Col md={6} xl={6}>
                        <Card>
                            <Card.Body>
                                <Player
                                ref={player => {
                                    this.player = player;
                                  }}
                                  autoPlay
                                    playsInline
                                    poster="/assets/poster.png"
                                    src= {process.env.PUBLIC_URL + "/video/lec.mp4"}
                                >
                                    <BigPlayButton position="center" />
                                </Player>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="pt-3">
                    <Col md={6} xl={12}>
                        <Card>
                            <Card.Body>
                                <LineChart/>

                                <div className="progress m-t-30 m-b-20"
                                style={{
                                    height: '15px',
                                    position: 'relative'
                        
                                }} 
                                ref={this.progressBarRef}>
                                    {
                                        this.state.tagPosition.map((item, i) => {
                                            return(
                                                <img name = {i} onClick = { (e) => {
                                                    console.log('click')
                                                    this.handleSeek(e)
                                                }}style = {{
                                                zIndex : 100,
                                                top: '-8px',

                                                height: '30px',
                                                width: 'auto',
                                                position: 'absolute',
                                                left: item.position,
                                
                                            }} src = {item_path + "surfboard_" + tag_color_list[i%tag_color_list.length]  + '_fill.png'}/>
                                            )
                                        })
                                    }
                            
                                    {
                                        example_progress_stack.map((item, i) =>
                                        {
                                            return (
                                                <div className={progress_color[i%2]} role="progressbar"
                                                onMouseOut={(e) =>
                                                {
                                                    this.handleTooltip(e)
                                                }} onMouseOver={(e) =>
                                                {
                                                    this.handleTooltip(e)
                                                }} data-div_id={i}
                                                 ref={content => this.progressRef[i] = content}
                                                 style={{ width: item }}
                                                 aria-valuenow="70"
                                                 aria-valuemin="0"
                                                 aria-valuemax="100"
                                                >
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    this.progressRef.map((item, i) => {

                                        return (
                                            <Overlay target={item} show={this.state.isTooltip[i]} placement='top' >{
                                                (props) => (
                                                    <Tooltip id="overlay-example" {...props}>
                                                        My Tooltip
                                                    </Tooltip>)
                                            }</Overlay>
                                        )
                                    })
                                }

                       
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
                                                (feedback, i) => {
                                                    let emoji = checkEmoji(feedback.emoji)
                                                    return (
                                                        <tr className="unread">
                                                            <td><img className="rounded-circle" style={{ width: '60px' }} src={emoji} alt="activity-user" /></td>
                                                            <td>
                                                                <h6 className="mb-1 f-16">{feedback.text}</h6>
                                                                <p className="m-0">{feedback.subtext}</p>
                                                            </td>
                                                            <td>
                                                            <Button style ={{width: '60px', height: '30px', margin: 'auto'}}size = {'sm'} variant = {tag_color_code_list[i%tag_color_code_list.length]}name = {i} onClick = {(e) => {this.handleSeek(e)}}>{String(Math.floor(feedback.time / 60)) + ":" + String(feedback.time % 60)}</Button></td>
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
                                        <img className="rounded-circle" style={{ width: '100px' }} src={checkEmoji("nerd")} alt="activity-user" />
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
                                        <h6 className="align-items-center float-right"><i className="fa fa-star f-10 m-r-10 text-c-yellow" />70%</h6>
                                        <div className="progress m-t-30 m-b-20" style={{ height: '6px' }}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left">1주차-1</h6>
                                        <h6 className="align-items-center float-right"><i className="fa fa-star f-10 m-r-10 text-c-yellow" />55%</h6>
                                        <div className="progress m-t-30 m-b-20" style={{ height: '6px' }}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '55%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left">4주차-2</h6>
                                        <h6 className="align-items-center float-right"><i className="fa fa-star f-10 m-r-10 text-c-yellow" />50%</h6>
                                        <div className="progress m-t-30 m-b-20" style={{ height: '6px' }}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '50%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
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
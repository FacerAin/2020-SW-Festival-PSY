import React from 'react';
import { Row, Col, Card, Table, Badge, Overlay, Tooltip, Button } from 'react-bootstrap';
import { Player, BigPlayButton } from 'video-react'
import moment from 'moment';


import Aux from "../../hoc/_Aux";
import "../../../node_modules/video-react/dist/video-react.css";


import LineChart from "./LineChart";


const tag_color_code_list = ['danger', 'primary', 'dark', 'secondary', 'success', 'warning']
const tag_color_list = ['red',  'blue', 'dark', 'gray', 'mint', 'yellow']
const example_progress_stack = ['47.2%' , '7%','12.8%', '12.8%',  '20%']
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
            graphPer: ['47.2%' , '7%','12.8%', '12.8%',  '20%'],
            taglist: [{time: 425,  tag: 'ppt'}, {time: 488, tag: 'picture'}, {time:604, tag: 'ppt'}, {time: 720, tag: 'plusCase'}, {time: 900, tag: 'ppt'}],
            feedbacklist: [
                { text: "이 구간에 학생들이 집중하지 않았어요. ", subtext: "이미지 혹은 사례를 준비해보면 어떨까요?", emoji: "yawning", time: 120 },
                { text: "학생들이 내용 이해를 어려워해요", subtext: "다음 시간에 추가 설명이 필요해 보여요", emoji: "explode", time: 332 },
                { text: "학생들의 집중도가 높아졌어요", subtext: "그림 설명이 이해가 잘 되었나봐요", emoji: "smiling", time: 450 },
            { text: "설명이 너무 빠르대요.", subtext: "조금 마음의 여유를 가져 볼까요?", emoji: "yawning", time: 630 },
            { text: "학생들이 내용 이해를 어려워해요", subtext: "관련 영상도 준비해보면 좋을 것 같아요!", emoji: "thinking", time: 650 }],
            feedbackAll: { text: "집중 SoSo", subtext: "사례 설명과 그림 설명이 반응이 좋았어요. 다음 수업 시간에도 적용해보아요!", emoji: "thinking" },
            source: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
            isTooltip: [],
            tagPosition : [],
            videoSec: '900'
        }
        example_progress_stack.map((i) => {
            this.setState({ isTooltip: this.state.isTooltip.push(false) })
        })

    }

    componentDidMount() {
        let tag_timeline = []
        this.state.feedbacklist.map((item) => {
            tag_timeline.push(item.time)
        })

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
                case 'explode':
                    return emoji_path + 'exploding-head.png'
                case 'thinking':
                    return emoji_path + 'thinking-face.png'

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
                                         
                                                    this.handleSeek(e)
                                                }} style = {{
                                                zIndex : 100,
                                                top: '-8px',

                                                height: '30px',
                                                width: 'auto',
                                                position: 'absolute',
                                                left: item.position,
                                
                                            }} src = {item_path + "surfboard_" + tag_color_list[i%tag_color_list.length]  + '_fill.png'}
                                               alt={"progress"}/>
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
                                                 style={{ width: item}}
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
                                                        {this.state.taglist[i]["tag"]}
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
                                                            <Button style ={{width: '60px', height: '30px', margin: 'auto'}}size = {'sm'} variant = {tag_color_code_list[i%tag_color_code_list.length]}name = {i} onClick = {(e) => {this.handleSeek(e)}}>{moment.utc(moment.duration(feedback.time, 'seconds').as('milliseconds')).format("mm:ss")}</Button></td>
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
import React, { useState, useEffect } from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
const emoji_path = process.env.PUBLIC_URL + "/emoji/"
const State = ({stateSrc,handleButton, handleSurvey, isSurvey }) => {


    const [time, setTime] = useState(moment.duration(30, 'seconds'));
    const [timeTick, setTimeTick] = useState(null);

    useEffect(() => {
        if(isSurvey){
            startTimer()
        }
    },[isSurvey])

    useEffect (() => {
        if(time.asSeconds()<=0){
            stopTimer()
            
            console.log('timeOver')
        }
    },[time])


    const getButton = (e) => {
        handleButton(e)

        if(isSurvey){
            stopTimer()
        }
      
    }






    const startTimer = () => {

        const tick = () => setTime(prevTime => moment.duration(prevTime.asSeconds() - 1, 'seconds'))
        const timeTick = setInterval(() => {

            tick()
        }, 1000)
        setTimeTick(timeTick)
    };

    const pauseTimer = () => {
        if (timeTick) {
            clearInterval(timeTick);
        }
    };

    const stopTimer = () => {
        pauseTimer()
        handleSurvey()
        setTime(moment.duration(30, 'seconds'))
    };


return (
    <div style={{
        paddingLeft: '1rem',
    }}>
    { !isSurvey ? ( <div className="row" >
        {stateSrc['label_success'].map((item, i) => {
            return (
                <OverlayTrigger xs={3} key={i} overlay={<Tooltip>{item}</Tooltip>}>
                    <Button onClick={(e) => getButton(e)} name={i} variant={'outline-' + 'success'}><img style={{ width: '50px' }} src={emoji_path + stateSrc['img_success'][i]} alt="activity-user" /></Button>
                </OverlayTrigger>

            )

        })}
        </div>) : (
            <div>
        <img src= {process.env.PUBLIC_URL + "/item/surfboard.png"} style={{height: '5rem', width: 'auto', padding: '1rem'}}></img>
        <p> 지금 수업 방식을<br/>
            선택해주세요.
        </p>
        <p>{moment(time.asSeconds(), 's').format("HH:mm:ss")}</p> </div> )}



    <div className="row" style={{
      
    }}>

        {stateSrc['label_warning'].map((item, i) => {
            return (

                <OverlayTrigger xs={6} key={stateSrc["label_success"].length + i - 1} overlay={<Tooltip>{item}</Tooltip>}>
                    <Button onClick={(e) => getButton(e)} name={stateSrc["label_success"].length + i} variant={'outline-' + 'warning'}><img style={{ width: '50px' }} src={emoji_path + stateSrc['img_warning'][i]} alt="activity-user" /></Button>
                </OverlayTrigger>
            )

        })}
    </div>
</div>
)
}


export default State
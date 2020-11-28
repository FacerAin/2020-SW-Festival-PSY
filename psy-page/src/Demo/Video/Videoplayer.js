import React, { Component } from 'react';
import { Player, ControlBar, Shortcut, VolumeMenuButton } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";

export default class Videoplayer extends Component {

    constructor(props){
        super(props)
        this.handleVideo = this.handleVideo.bind(this)
    }

    handleVideo(state){
        this.props.handleVideo(state)
    }

    componentDidUpdate() {
        // subscribe state change
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
      }
      
      handleStateChange(state, prevState) {
        // copy player state to this component's state
        this.handleVideo(state)
      }

    render(){
        return (
            <div>
            <Player
            ref={player => {
                this.player = player;
            }}
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
            </div>
        )
    }

    
}


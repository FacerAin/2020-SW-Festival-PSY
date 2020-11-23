import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';
import { Row, Button } from 'react-bootstrap';
import "../../../node_modules/video-react/dist/video-react.css";

import Aux from "../../hoc/_Aux";
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
                <Row>
                    <Player
                        playsInline
                        poster="/assets/poster.png"
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    />
                </Row>
            </Aux>
        );
    }
}
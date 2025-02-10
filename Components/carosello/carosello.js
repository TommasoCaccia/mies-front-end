"use client";
import {Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from "@/Components/carosello/carosello.module.css";

export default function HomeCarousel() {
    return (
        <div className={classes.carosello}>
            <Carousel>
                <Carousel.Item>
                    <img
                        className={classes.Immagine1}
                        src="/Azienda.jpg"
                        alt="Los Angeles"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className={classes.Immagine1}
                        src="/Servizi.jpg"
                        alt="Chicago"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className={classes.Immagine1}
                        src="/Azienda.jpg"
                        alt="New York"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

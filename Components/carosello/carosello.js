"use client"
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from "@/Components/carosello/carosello.module.css";

export default function HomeCarousel() {
    return (
        <div className={` ${classes.carosello}`}>
            <Carousel>
                <Carousel.Item>
                    <img
                        className={classes.Immagine1}
                        src="/Azienda.jpg"
                        alt="Los Angeles"
                    />
                    <Carousel.Caption>
                        <h3>Los Angeles</h3>
                        <p>LA is always so much fun!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className={classes.Immagine1}
                        src="/Servizi.jpg"
                        alt="Chicago"
                    />
                    <Carousel.Caption>
                        <h3>Chicago</h3>
                        <p>Thank you, Chicago!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className={classes.Immagine1}
                        src="/Azienda.jpg"
                        alt="New York"
                    />
                    <Carousel.Caption>
                        <h3>New York</h3>
                        <p>We love the Big Apple!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

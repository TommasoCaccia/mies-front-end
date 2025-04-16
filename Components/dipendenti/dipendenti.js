"use client";
import classes from './dipendenti.module.css';
import icon from '@/public/images.webp';
import React from "react";
import Image from "next/image";

const dipendenti = () => {
    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <Image src={icon} className={classes.image} alt="icon"/>
                <div className={classes.cardInfo}>
                    <span>George Johnson</span>
                    <p>Support Specialist</p>
                </div>
            </div>

            <div className={classes.card}>
                <div className={classes.image}></div>
                <div className={classes.cardInfo}>
                    <span>George Johnson</span>
                    <p>Support Specialist</p>
                </div>
            </div>

            <div className={classes.card}>
                <div className={classes.image}></div>
                <div className={classes.cardInfo}>
                    <span>George Johnson</span>
                    <p>Support Specialist</p>
                </div>
            </div>

            <div className={classes.card}>
                <div className={classes.image}></div>
                <div className={classes.cardInfo}>
                    <span>George Johnson</span>
                    <p>Support Specialist</p>
                </div>
            </div>
        </div>
    );
}
export default dipendenti;
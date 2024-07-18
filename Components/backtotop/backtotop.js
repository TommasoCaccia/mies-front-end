'use client'
import { useEffect, useState } from 'react';
import classes from './backToTop.module.css';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (typeof window !== 'undefined' && window.scrollY> 250) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className={classes.backToTop}>
            {isVisible && (
                <button onClick={scrollToTop} className={classes.button}>
                    ↑
                </button>
            )}
        </div>
    );
};

export default BackToTop;

"use client";
import React from "react";
import classes from "./cardTeam.module.css";
import uomo from "../../public/uomo.png";
import donna from "../../public/donna.png";
import Image from "next/image";

const employeeData = [
    {
        id: 1,
        name: "Luca Marretta",
        role: "Ingeniere meccanico",
        image: uomo
    },
    {
        id: 2,
        name: "Claudio",
        role: "IT",
        image: uomo
    },
    {
        id: 3,
        name: "Federico",
        role: "IT",
        image: uomo
    },
    {
        id: 4,
        name: "Simone Bigarella",
        role: "Backend Engineer",
        image: uomo
    },
    {
        id: 5,
        name: "Paolo",
        role: "DevOps Engineer",
        image: uomo
    },
    {
        id: 6,
        name: "Manuela Fason",
        role: "Commercante",
        image: donna
    }
];

const EmployeeCard = ({name, role, image}) => {
    return (
        <div className={classes.card}>
            <div className={classes.cardContent}>
                <div className={classes.imageWrapper}>
                    <Image
                        src={image}
                        alt={name}
                        className={classes.image}
                        onError={(e) => {
                            e.target.src = uomo;
                        }}
                    />
                </div>
                <div className={classes.textCenter}>
                    <h3 className={classes.name}>{name}</h3>
                    <p className={classes.role}>{role}</p>
                </div>
            </div>
        </div>
    );
};

const EmployeeCardGrid = () => {
    return (
        <div className={classes.container}>
            <h2 className={classes.title}>Il nostro team</h2>
            <div className={classes.grid}>
                {employeeData.map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        name={employee.name}
                        role={employee.role}
                        image={employee.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmployeeCardGrid;

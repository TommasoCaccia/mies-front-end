"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import classes from "./form.module.css";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8080/email/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Richiesta inviata con successo!",
                    text: "Grazie per averci contattato.",
                    confirmButtonText: "OK",
                });
                setFormData({ name: "", email: "", message: "" }); // Resetta il form
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Errore durante l'invio",
                    text: errorData.message || "Errore sconosciuto.",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Errore",
                text: error.message,
                confirmButtonText: "OK",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={classes.formContainer}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <h1>Inviaci un email</h1>
                <div className={classes.formGroup}>
                    <label htmlFor="name" className={classes.label}>
                        Nome di riferimento:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={classes.input}
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="email" className={classes.label}>
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={classes.input}
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="message" className={classes.label}>
                        Messaggio:
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className={classes.textarea}
                    />
                </div>
                <button type="submit" disabled={isLoading} className={classes.button}>
                    {isLoading ? "Invio in corso..." : "Invia"}
                </button>
            </form>
        </div>
    );
}

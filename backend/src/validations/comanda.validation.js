"use strict";
import Joi from "joi";

export const comandaQueryValidation = Joi.object({
    id: Joi.number().integer().min(1).positive().messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo.",
    }),
    mesa: Joi.number().integer().min(1).positive().messages({
        "number.base": "La mesa debe ser un número.",
        "number.integer": "La mesa debe ser un número entero.",
        "number.positive": "La mesa debe ser un número positivo.",
    }),
    estado: Joi.string().min(3).max(50).messages({
        "string.empty": "El estado no puede estar vacío.",
        "string.base": "El estado debe ser de tipo string.",
        "string.min": "El estado debe tener como mínimo 3 caracteres.",
        "string.max": "El estado debe tener como máximo 50 caracteres.",
    }),
});

export const comandaBodyValidation = Joi.object({
    fecha: Joi.date().messages({
        "date.base": "La fecha debe ser de tipo date.",
    }),
    mesa: Joi.number().integer().min(1).positive().messages({
        "number.base": "La mesa debe ser un número.",
        "number.integer": "La mesa debe ser un número entero.",
        "number.positive": "La mesa debe ser un número positivo.",
    }),
    estado: Joi.string().min(5).max(50).messages({
        "string.empty": "El estado no puede estar vacío.",
        "string.base": "El estado debe ser de tipo string.",
        "string.min": "El estado debe tener como mínimo 3 caracteres.",
        "string.max": "El estado debe tener como máximo 50 caracteres.",
    }),
}); 
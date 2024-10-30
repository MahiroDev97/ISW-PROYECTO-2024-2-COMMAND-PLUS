"use strict";

import Joi from "joi";

export const turnoQueryValidation = Joi.object({
    id: Joi.number().integer().min(1).positive().messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo.",
    }),
    id_user: Joi.number().integer().min(1).positive().messages({
        "number.base": "El id_user debe ser un número.",
        "number.integer": "El id_user debe ser un número entero.",
        "number.positive": "El id_user debe ser un número positivo.",
    }),
    datetimeInicio: Joi.date().iso().messages({
        "date.base": "La fecha de inicio debe ser una fecha válida.",
        "date.format": "La fecha de inicio debe tener el formato ISO 8601.",
    }),
    datetimeFin: Joi.date().iso().when('datetimeInicio', {
        is: Joi.date().required(),
        then: Joi.date().greater(Joi.ref('datetimeInicio')),
    }).messages({
        "date.base": "La fecha de fin debe ser una fecha válida.",
        "date.greater": "La fecha de fin debe ser una fecha posterior a la fecha de inicio.",
        "date.format": "La fecha de fin debe tener el formato ISO 8601.",
    }),
});

export const turnoBodyValidation = Joi.object({
    id_user: Joi.number().integer().min(1).positive().messages({
        "number.base": "El id_user debe ser un número.",
        "number.integer": "El id_user debe ser un número entero.",
        "number.positive": "El id_user debe ser un número positivo.",
    }),
    datetimeInicio: Joi.date().iso().required().messages({
        "date.base": "La fecha de inicio debe ser una fecha válida.",
        "date.format": "La fecha de inicio debe tener el formato ISO 8601.",
    }),
    datetimeFin: Joi.date().iso().when('datetimeInicio', {
        is: Joi.date().required(),
        then: Joi.date().greater(Joi.ref('datetimeInicio')),
    }).messages({
        "date.base": "La fecha de fin debe ser una fecha válida.",
        "date.greater": "La fecha de fin debe ser una fecha posterior a la fecha de inicio.",
        "date.format": "La fecha de fin debe tener el formato ISO 8601.",
    }),
});

"use strict";
import Joi from "joi";

export const productcomandaQueryValidation = Joi.object({
  id: Joi.number().integer().min(1).positive().messages({
    "number.base": "El id debe ser un número.",
    "number.integer": "El id debe ser un número entero.",
    "number.positive": "El id debe ser un número positivo.",
    }),
    id_product: Joi.number().integer().min(1).positive().messages({
      "number.base": "El id del producto debe ser un número.",
      "number.integer": "El id del producto debe ser un número entero.",
      "number.positive": "El id del producto debe ser un número positivo.",
    }),
});
export const productcomandaBodyValidation = Joi.object({
    estadoproductocomanda: Joi.string().min(3).max(50).messages({
      "string.empty": "El estado de la comanda no puede estar vacío.",
      "string.base": "El estado de la comanda debe ser de tipo string.",
      "string.min": "El estado de la comanda debe tener como mínimo 3 caracteres.",
      "string.max": "El estado de la comanda debe tener como máximo 50 caracteres.",
    }),
    fechahorarecepcion: Joi.date().messages({
      "date.base": "La fecha y hora de recepción debe ser de tipo date.",
    }),
    fechahoraentrega: Joi.date().messages({
      "date.base": "La fecha y hora de entrega debe ser de tipo date.",
    }),
    });
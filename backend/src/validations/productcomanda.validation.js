"use strict";
import Joi from "joi";

export const productComandaQueryValidation = Joi.object({
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
export const productComandaBodyValidation = Joi.object({
  id_product: Joi.number().integer().min(1).positive().messages({
    "number.base": "El id del producto debe ser un número.",
    "number.integer": "El id del producto debe ser un número entero.",
    "number.positive": "El id del producto debe ser un número positivo.",
  }),
  estadoproductocomanda: Joi.string().min(3).max(50).messages({
    "string.empty": "El estado de la comanda no puede estar vacío.",
    "string.base": "El estado de la comanda debe ser de tipo string.",
    "string.min":
      "El estado de la comanda debe tener como mínimo 3 caracteres.",
    "string.max":
      "El estado de la comanda debe tener como máximo 50 caracteres.",
  }),
  fechahorarecepcion: Joi.date().messages({
    "date.base": "La fecha y hora de recepción debe ser de tipo date.",
  }),
  fechahoraentrega: Joi.date().messages({
    "date.base": "La fecha y hora de entrega debe ser de tipo date.",
  }),
});

export const productosPorMesQueryValidation = Joi.object({
  mes: Joi.number().integer().min(1).max(12).required().messages({
    "number.base": "El mes debe ser un número.",
    "number.integer": "El mes debe ser un número entero.",
    "number.min": "El mes debe ser mayor o igual a 1.",
    "number.max": "El mes debe ser menor o igual a 12.",
    "any.required": "El mes es requerido.",
  }),
  ano: Joi.number()
    .integer()
    .min(2023)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.base": "El año debe ser un número.",
      "number.integer": "El año debe ser un número entero.",
      "number.min": "El año debe ser mayor o igual a 2000.",
      "number.max": "El año debe ser menor o igual al año actual.",
      "any.required": "El año es requerido.",
    }),
});





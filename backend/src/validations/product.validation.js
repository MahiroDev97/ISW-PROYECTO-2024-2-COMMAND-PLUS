"use strict";
import Joi from "joi";

export const productQueryValidation = Joi.object({
  id: Joi.number().integer().min(1).positive().messages({
    "number.base": "El id debe ser un número.",
    "number.integer": "El id debe ser un número entero.",
    "number.positive": "El id debe ser un número positivo.",
  }),
  nombre: Joi.string().min(3).max(50).messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    "string.min": "El nombre debe tener como mínimo 3 caracteres.",
    "string.max": "El nombre debe tener como máximo 50 caracteres.",
  }),
});

export const productBodyValidation = Joi.object({
  nombre: Joi.string().min(3).max(50).messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    "string.min": "El nombre debe tener como mínimo 3 caracteres.",
    "string.max": "El nombre debe tener como máximo 50 caracteres.",
  }),
  categoria: Joi.string().min(3).max(50).messages({
    "string.empty": "La categoría no puede estar vacía.",
    "string.base": "La categoría debe ser de tipo string.",
    "string.min": "La categoría debe tener como mínimo 3 caracteres.",
    "string.max": "La categoría debe tener como máximo 50 caracteres.",
  }),
  descripcion: Joi.string().max(500).messages({
    "string.base": "La descripción debe ser de tipo string.",
    "string.max": "La descripción debe tener como máximo 500",
  }),
  precio: Joi.number().positive().messages({
    "number.base": "El precio debe ser un número.",
    "number.positive": "El precio debe ser un número positivo.",
  }),
  disponibilidad: Joi.boolean().messages({
    "boolean.base": "La disponibilidad debe ser un booleano.",
  }),
  imagen: Joi.any().optional().messages({
    "any.base": "La imagen debe ser un archivo.",
  }),
});

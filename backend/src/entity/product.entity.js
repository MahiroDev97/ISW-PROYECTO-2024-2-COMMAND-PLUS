"use strict";
import { EntitySchema } from "typeorm";

const ProductSchema = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    categoria: {
      type: "text",
      nullable: false,
    },
    nombre: {
      type: "text",
      nullable: false,
      unique: true,
    },
    descripcion: {
      type: "text",
      nullable: true,
    },
    precio: {
      type: "int",
      nullable: false,
    },
    disponibilidad: {
      type: "boolean",
      default: true,
    },
  },
});

export default ProductSchema;

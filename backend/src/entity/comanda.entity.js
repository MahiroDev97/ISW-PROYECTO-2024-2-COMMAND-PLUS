"use strict";
import { EntitySchema } from "typeorm";

const ComandaSchema = new EntitySchema({
  name: "Comanda",
  tableName: "comandas",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    fecha: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
    mesa: {
      type: "int",
      nullable: false,
    },
    estado: {
      type: "text",
      nullable: false,
    },
    comentarios: {
      type: "text",
      nullable: true,
    },
  },
  relations: {
    productcomandas: {
      type: "one-to-many",
      target: "ProductComanda",
      inverseSide: "comanda",
      eager:true,
    },
  }
});

export default ComandaSchema;

"use strict";
import { EntitySchema } from "typeorm";

const ProductComandaSchema = new EntitySchema({
  name: "ProductComanda",
  tableName: "productcomanda",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    id_product: {
      type: "int",
      nullable: false,
    },
    estadoproductocomanda: {
      type: "text",
      nullable: false,
    },
    fechahorarecepcion: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
    fechahoraentrega: {
      type: "date",
      nullable: true,
    },
  },
});

export default ProductComandaSchema;

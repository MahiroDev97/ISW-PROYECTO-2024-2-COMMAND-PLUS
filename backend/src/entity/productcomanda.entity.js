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
      type: "timestamp",
      nullable: true,
    },
  },
  relations: {
    product: {
      type: "many-to-one",
      target: "Product",
      joinColumn: {
        name: "productId",
        referencedColumnName: "id",
      },
      nullable: false,
      eager: true,
    },
    comanda: {
      type: "many-to-one",
      target: "Comanda",
      joinColumn: {
        name: "comandaId",
        referencedColumnName: "id",
      },
      nullable: false,
    },
  }
});

export default ProductComandaSchema;

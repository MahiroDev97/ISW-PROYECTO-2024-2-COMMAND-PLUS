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
    comandaId: {
      type: "int",
      nullable: false,
    },
    id_product: {
      type: "int",
      nullable: false,
      references: {
        name: "product_id",
        referencedTableName: "products",
        referencedColumnNames: ["id"],
      },
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
      target: "Product",
      type: "many-to-one",
      joinColumn: {
        name: "id_product"
      },
      eager: false
    }
  }
});

export default ProductComandaSchema;

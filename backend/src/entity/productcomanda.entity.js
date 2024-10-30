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
        type: "date",
        nullable: false,
        },
        fechahoraentrega: {
        type: "date",
        nullable: false,
        }
    },
    });

    export default ProductComandaSchema;
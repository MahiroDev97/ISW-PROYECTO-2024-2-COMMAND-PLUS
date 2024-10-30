"use strict"
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
        type: "date",
        nullable: false,
        },
        mesa: {
        type: "int",
        nullable: false,
        },
        estado: {
        type: "text",
        nullable: false,
        },
    },
});

export default ComandaSchema;
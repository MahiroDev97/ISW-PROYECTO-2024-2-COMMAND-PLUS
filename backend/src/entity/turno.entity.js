"use strict";

import { EntitySchema } from "typeorm";


const TurnoSchema = new EntitySchema({
    name: "Turno",
    tableName: "turnos",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        datetimeInicio: {
            type: "timestamp",
            nullable: false,
        },
        datetimeFin: {
            type: "timestamp",
            nullable: true,
        },
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            joinColumn: {
                name: "userId",
                referencedColumnName: "id",
            },
            nullable: false,
            eager: true,
        }
    }
});


export default TurnoSchema;
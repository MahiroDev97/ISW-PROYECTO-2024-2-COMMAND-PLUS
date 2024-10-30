

"use strict";

import { EntitySchema } from "typeorm";
import UserSchema from "./user.entity.js";
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
        user: {
            type: UserSchema,
            nullable: false,
        },
    },
});

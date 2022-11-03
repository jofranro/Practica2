import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Car } from "../types.ts";

export type CarSchema = Car &  { _id: ObjectId };
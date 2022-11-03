import { CarSchema } from "../db/schemas.ts"
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { Car } from "../types.ts";
import { carsCollection } from "../db/database.ts";

type AddCarContext = RouterContext<
    "/addCar",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

export const addCar = async (context: AddCarContext) => {

    try{
        const body = context.request.body({type: "json"});
        const value = await body.value;

        if (!value?.plate || !value?.seats) {
            context.response.status = 400;
            context.response.body = {
                message: "You need to provide plate and seats",
            };
            return;
        }
        const car: Partial<Car> = {
            ...value,
            free: true,
          };
        //Check if car already in db  
        const found = await carsCollection.findOne({plate: value.plate});
        if(found){
            context.response.status = 400;
            context.response.body = {
                message: "Car already in the DDBB",
            };
            return;
        }

        const id = await carsCollection.insertOne(car as CarSchema);
        car.id = id.toString();
        const { _id, ...carWithoutId } = car as CarSchema;
        context.response.body = carWithoutId;

    }catch(e){
        console.error(e);
        context.response.status = 500;
    }
};
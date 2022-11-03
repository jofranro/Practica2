import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { carsCollection } from "../db/database.ts";
import { CarSchema } from "../db/schemas.ts"

type ReleaseCarContext = RouterContext<
    "/releaseCar/:id",
     { // & Unir tipos
        id: string;
    }
    & Record<string | number, string | undefined>,
    Record<string, any>
>;

export const releaseCar = async (context: ReleaseCarContext) => {
    try{
        if (context.params?.id) {
            const car: CarSchema | undefined = await carsCollection.findOne({
              _id: new ObjectId(context.params.id),
            });
      
            if (car) {
              if (!car.free) {
                await carsCollection.updateOne(
                  {
                    _id: car._id,
                  },
                  {
                    $set: {
                      free: true,
                    },
                  }
                );
                context.response.status = 200;
                return;
              } else {
                context.response.status = 400;
                context.response.body = { message: "Car is already free" };
              }
            } else {
              context.response.status = 404;
              context.response.body = { message: "Car not found" };
            }
        }
    }catch(e){
        console.error(e);
        context.response.status = 500;
    }
}
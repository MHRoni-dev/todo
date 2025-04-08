import { z } from "zod";
import { Types } from "mongoose";

// Custom Zod schema that *validates* a string but *infers* as ObjectId
const objectIdZod = z
  .instanceof(Types.ObjectId)
  .or(
    z.string().regex(/^[a-f\d]{24}$/i).transform((val) => new Types.ObjectId(val))
  )
  .transform((val) =>
    val instanceof Types.ObjectId ? val : new Types.ObjectId(val)
  );

export default objectIdZod;
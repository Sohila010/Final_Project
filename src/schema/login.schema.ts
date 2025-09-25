import * as z from "zod"

export const loginschema = z.object({
    email: z.email().nonempty("this field can`t be Empty"),
    password: z.string().nonempty("this field can`t be Empty").min(6, "min length is 6 char"),
   
})

export type loginSchemaType=z.infer<typeof loginschema >
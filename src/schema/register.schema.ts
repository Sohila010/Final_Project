import * as z from "zod"

export const registerschema = z.object({
    name: z.string().nonempty("this field can`t be Empty").min(2, "min length is 2").max(10, "max length is 10 "),
    email: z.email().nonempty("this field can`t be Empty"),
    password: z.string().nonempty("this field can`t be Empty").min(6, "min length is 6 char"),
    rePassword: z.string().nonempty("this field can`t be Empty"),
    phone: z.string().regex(/^01[0251][0-9]{8}$/),
}).refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error:"Password and Repassword isn`t Match !!!"
})

export type registerSchemaType=z.infer<typeof registerschema >
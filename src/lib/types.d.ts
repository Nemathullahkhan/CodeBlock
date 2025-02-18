import { User } from "@prisma/client";


declare module "next-auth" {
    interface Session {
        user?: Partial<User>;
    }
    interface JWT{
        user?: Partial<User>;
    }

}
 
   
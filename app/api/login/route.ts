// importing prisma client from our custom prisma instance
import prisma from "@/lib/prisma";
// import all modules from bcrypt
import * as bcrypt from "bcrypt";

// data we should be expecting from the request
interface RequestBody {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    const user = await prisma.user.findFirst({
        where: {
            email: body.username,
        }
    })

    if (user && (await bcrypt.compare(body.password, user.password))) {

        const {password, ...userWithoutPassword} = user;
        return new Response(JSON.stringify(userWithoutPassword));
    } else {
        return new Response(JSON.stringify(null));
    }
}

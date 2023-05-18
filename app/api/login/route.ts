import prisma from "@/lib/prisma";

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

    if (user && user.password) {

    }
}

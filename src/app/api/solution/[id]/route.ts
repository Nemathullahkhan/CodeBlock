import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req:NextRequest, {params}:{params:{id:string}}) {
    try{
        const {id} = params;
        if(!id) return NextResponse.json({error:"Invalid Id"},{status:400});

        const content = await prisma.content.findUnique({
            where:{id},
            include:{implementation:true}
        });

        if (!content || !content.implementation) {
            return NextResponse.json({ error: "Solution not found" }, { status: 404 });
          }

        
      return NextResponse.json({ code: content.implementation.code });
    } catch(error){
        console.error("Error fetching solution:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
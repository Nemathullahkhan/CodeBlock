// app/api/topics/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        contents: {
          select: {
            id: true,
            title: true,
            iscompleted:true,
          },
        },
      },
    });
    
    return NextResponse.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}
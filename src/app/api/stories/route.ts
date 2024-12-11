import { prisma } from '@/shared/api/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  const stories = await prisma.story.findMany({
    include: {
      items: true,
    },
  });

  return NextResponse.json(stories);
}

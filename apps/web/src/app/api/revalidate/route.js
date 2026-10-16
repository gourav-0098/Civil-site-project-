import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { secret, paths } = body;

    const expectedSecret = process.env.REVALIDATION_SECRET || 'nivara_infra_revalidation_secret_key_2026';

    if (!secret || secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, error: 'Invalid revalidation secret' },
        { status: 401 }
      );
    }

    if (!Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Paths array is required' },
        { status: 400 }
      );
    }

    for (const p of paths) {
      try {
        revalidatePath(p);
      } catch (pathErr) {
        console.warn(`Failed to revalidate path "${p}":`, pathErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      paths,
      now: Date.now()
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

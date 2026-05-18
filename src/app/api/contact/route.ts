import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(payload: ContactPayload) {
  const name = payload.name?.trim() ?? '';
  const email = payload.email?.trim() ?? '';
  const subject = payload.subject?.trim() ?? '';
  const message = payload.message?.trim() ?? '';

  if (name.length < 2) {
    return { error: 'Please enter your name.' };
  }

  if (name.length > 120) {
    return { error: 'Name is too long.' };
  }

  if (!emailPattern.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (email.length > 160) {
    return { error: 'Email is too long.' };
  }

  if (subject.length < 3) {
    return { error: 'Please enter a short subject.' };
  }

  if (subject.length > 160) {
    return { error: 'Subject is too long.' };
  }

  if (message.length < 20) {
    return { error: 'Please add a little more detail to your message.' };
  }

  if (message.length > 5000) {
    return { error: 'Message is too long.' };
  }

  return { data: { name, email, subject, message } };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: 'We could not read that submission. Please try again.' },
      { status: 400 },
    );
  }

  const validation = validatePayload(payload);

  if ('error' in validation) {
    return NextResponse.json({ message: validation.error }, { status: 400 });
  }

  try {
    const { default: prisma } = await import('@/lib/prisma');

    await prisma.contactSubmission.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        projectType: validation.data.subject,
        message: validation.data.message,
      },
    });

    return NextResponse.json({
      message: 'Message sent successfully. We received your inquiry.',
    });
  } catch (error) {
    console.error('Failed to store contact submission in Supabase', error);

    return NextResponse.json(
      {
        message: 'We could not save your message right now. Please try again in a moment.',
      },
      { status: 500 },
    );
  }
}

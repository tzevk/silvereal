import { NextResponse } from 'next/server';
import { initializeDatabase, addSubscriber } from '../../../utils/db';

export async function POST(request) {
  try {
    // Initialize the database (creates tables if they don't exist)
    await initializeDatabase();
    
    // Parse the request body
    const body = await request.json();
    const { email } = body;
    
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Add the subscriber to the database
    const result = await addSubscriber(email);
    
    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'Thank you for subscribing!' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error in subscribe API:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

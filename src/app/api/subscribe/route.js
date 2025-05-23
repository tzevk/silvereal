import { NextResponse } from 'next/server';
import { initializeDatabase, addSubscriber } from '../../../utils/db';

export async function POST(request) {
  try {
    console.log('Received subscription request');
    
    // Initialize the database (creates tables if they don't exist)
    const dbInitResult = await initializeDatabase();
    console.log('Database initialization result:', dbInitResult);
    
    if (!dbInitResult) {
      console.error('Failed to initialize database');
      return NextResponse.json(
        { success: false, message: 'Database initialization failed' },
        { status: 500 }
      );
    }
    
    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('Error parsing request body:', e);
      return NextResponse.json(
        { success: false, message: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    const { email } = body;
    console.log('Received email:', email);
    
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Add the subscriber to the database
    const result = await addSubscriber(email);
    console.log('Add subscriber result:', result);
    
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
      { success: false, message: 'An unexpected error occurred: ' + error.message },
      { status: 500 }
    );
  }
}

import { neon } from '@neondatabase/serverless';

let client;
let connected = false;

export function getClient() {
  if (!client) {
    // Create a new client if one doesn't exist
    // For testing, hardcode the connection string (we'll remove this later)
    const connectionString = 'postgresql://neondb_owner:npg_i71kXgJTqrHd@ep-wandering-union-a5jkd4fg-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';
    
    console.log('Connecting to Neon database...');
    
    // Use neon directly instead of Pool
    client = neon(connectionString);
    connected = true;
  }
  return client;
}

// Initialize the database by creating tables if they don't exist
export async function initializeDatabase() {
  const sql = getClient();
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

// Add a new subscriber to the database
export async function addSubscriber(email) {
  const sql = getClient();
  
  try {
    const result = await sql`
      INSERT INTO subscribers (email) VALUES (${email}) RETURNING id
    `;
    console.log('Subscriber added successfully:', result);
    return { success: true, id: result[0]?.id };
  } catch (error) {
    // Check if the error is a duplicate key violation
    if (error.code === '23505') { // Unique violation in PostgreSQL
      return { success: false, error: 'This email is already subscribed' };
    }
    console.error('Error adding subscriber:', error);
    return { success: false, error: 'Database error' };
  }
}

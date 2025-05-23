import { Pool } from '@neondatabase/serverless';

let pool;

export function getPool() {
  if (!pool) {
    // Create a new pool if one doesn't exist
    pool = new Pool({
      connectionString: process.env.NEON_DATABASE_URL,
    });
  }
  return pool;
}

// Initialize the database by creating tables if they don't exist
export async function initializeDatabase() {
  const pool = getPool();
  
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

// Add a new subscriber to the database
export async function addSubscriber(email) {
  const pool = getPool();
  
  try {
    const result = await pool.query(
      'INSERT INTO subscribers (email) VALUES ($1) RETURNING id',
      [email]
    );
    return { success: true, id: result.rows[0].id };
  } catch (error) {
    // Check if the error is a duplicate key violation
    if (error.code === '23505') { // Unique violation in PostgreSQL
      return { success: false, error: 'This email is already subscribed' };
    }
    console.error('Error adding subscriber:', error);
    return { success: false, error: 'Database error' };
  }
}

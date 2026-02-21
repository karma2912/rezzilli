/*
  # Add message field to contact submissions

  1. Changes
    - Add `message` column to `contact_submissions` table
      - Type: text
      - Required field (NOT NULL)
      - Stores the message from users when they submit the waitlist form
  
  2. Notes
    - Using IF NOT EXISTS to prevent errors if column already exists
    - Message field is required for all new submissions
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'message'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN message text NOT NULL DEFAULT '';
  END IF;
END $$;
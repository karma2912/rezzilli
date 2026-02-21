/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - unique identifier for each submission
      - `who_are_you` (text) - type of person submitting (Consumer, Distributor, Bar/Restaurant Owner, Other)
      - `first_name` (text) - subscriber's first name
      - `last_name` (text) - subscriber's last name
      - `email` (text) - subscriber's email address
      - `created_at` (timestamptz) - timestamp when the submission was created
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert their own submissions
    - No read access needed as this is for data collection only
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  who_are_you text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
/*
  # Create tables for email subscriptions and contact form

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `status` (text) - For managing subscription status
    
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `company` (text)
      - `email` (text)
      - `phone` (text)
      - `employees` (text)
      - `monthly_trips` (text)
      - `message` (text)
      - `created_at` (timestamp)
      - `status` (text) - For tracking submission status

  2. Security
    - Enable RLS on both tables
    - Add policies for secure access
*/

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

-- Enable RLS for subscribers
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policies for subscribers table
CREATE POLICY "Enable insert for anonymous users" ON subscribers
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users only" ON subscribers
  FOR SELECT TO authenticated
  USING (true);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  employees text NOT NULL,
  monthly_trips text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'closed'))
);

-- Enable RLS for contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for contact_submissions table
CREATE POLICY "Enable insert for anonymous users" ON contact_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users only" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
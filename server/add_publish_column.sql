-- Add publish column to creations table
ALTER TABLE creations ADD COLUMN IF NOT EXISTS publish BOOLEAN DEFAULT false;

-- Update existing image creations to be published by default
UPDATE creations SET publish = true WHERE type = 'image';

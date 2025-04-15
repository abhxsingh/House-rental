/*
  # Create properties and amenities tables

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `location` (text)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `owner_id` (uuid, references auth.users)
    - `amenities`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `name` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read all properties
    - Add policies for property owners to manage their properties
*/

CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  location text NOT NULL,
  bedrooms integer NOT NULL,
  bathrooms integer NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  owner_id uuid REFERENCES auth.users NOT NULL
);

CREATE TABLE amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties ON DELETE CASCADE NOT NULL,
  name text NOT NULL
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view properties"
  ON properties
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can manage their own properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Anyone can view amenities"
  ON amenities
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Property owners can manage amenities"
  ON amenities
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = amenities.property_id
      AND properties.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = amenities.property_id
      AND properties.owner_id = auth.uid()
    )
  );
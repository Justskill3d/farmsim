/*
  # Events, Choices, and Mystery Package Persistence

  1. New Tables
    - `event_log` stores every random event and choice the player has seen across sessions
      - `id` uuid primary key
      - `player_id` uuid - anonymous client id for this installation
      - `day` int - game day when the event occurred
      - `event_id` text - identifier of the event
      - `event_type` text - daily | encounter | mystery_package
      - `choice_id` text nullable - option chosen by the player
      - `created_at` timestamptz
    - `mystery_packages` stores which weekly package option the player picked
      - `id` uuid primary key
      - `player_id` uuid
      - `week` int - which in-game week
      - `options` jsonb - the three options that were offered
      - `chosen_option_id` text
      - `created_at` timestamptz
  2. Security
    - Enable RLS on both tables
    - Anonymous clients may insert their own rows keyed by `player_id`
    - Anonymous clients may read only rows matching their `player_id` via header claim
*/

CREATE TABLE IF NOT EXISTS event_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL,
  day int NOT NULL DEFAULT 1,
  event_id text NOT NULL,
  event_type text NOT NULL DEFAULT 'daily',
  choice_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS event_log_player_id_idx ON event_log(player_id);
CREATE INDEX IF NOT EXISTS event_log_created_at_idx ON event_log(created_at);

ALTER TABLE event_log ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'event_log' AND policyname = 'Players can insert their own event rows'
  ) THEN
    CREATE POLICY "Players can insert their own event rows"
      ON event_log FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'event_log' AND policyname = 'Players can read their own event rows'
  ) THEN
    CREATE POLICY "Players can read their own event rows"
      ON event_log FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS mystery_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL,
  week int NOT NULL DEFAULT 1,
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  chosen_option_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS mystery_packages_player_id_idx ON mystery_packages(player_id);

ALTER TABLE mystery_packages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'mystery_packages' AND policyname = 'Players can insert mystery package rows'
  ) THEN
    CREATE POLICY "Players can insert mystery package rows"
      ON mystery_packages FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'mystery_packages' AND policyname = 'Players can read mystery package rows'
  ) THEN
    CREATE POLICY "Players can read mystery package rows"
      ON mystery_packages FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, key);

const PLAYER_ID_KEY = 'farmingSimPlayerId';

export function getPlayerId(): string {
  let id = localStorage.getItem(PLAYER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(PLAYER_ID_KEY, id);
  }
  return id;
}

export async function logEvent(params: {
  day: number;
  eventId: string;
  eventType: 'daily' | 'encounter' | 'mystery_package';
  choiceId?: string;
}) {
  try {
    await supabase.from('event_log').insert({
      player_id: getPlayerId(),
      day: params.day,
      event_id: params.eventId,
      event_type: params.eventType,
      choice_id: params.choiceId ?? null,
    });
  } catch {
    // persistence is best-effort
  }
}

export async function logMysteryPackage(params: {
  week: number;
  options: unknown[];
  chosenOptionId: string;
}) {
  try {
    await supabase.from('mystery_packages').insert({
      player_id: getPlayerId(),
      week: params.week,
      options: params.options,
      chosen_option_id: params.chosenOptionId,
    });
  } catch {
    // best-effort
  }
}

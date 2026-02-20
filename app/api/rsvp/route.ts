import { NextResponse } from 'next/server';

type RsvpPayload = {
  name: string;
  email: string;
  attendance?: string;
  guests?: string;
  message?: string;
};

const DEFAULT_RESERVED_SEATS: Record<string, number> = {
  'al pandis': 6,
  'joan de la cruz': 12,
  'james milo': 2,
  'danillo sulit': 2,
  'alvin mutia': 1,
  'joeben tapel': 2,
  'ace aytin': 2,
  'jude paterno': 1,
  'harry reyes': 1,
  'darie marcellana': 1,
  'princess salazar': 1,
  'michelle flores': 1,
  'albee bussa': 1,
  'glaiza hodge': 1,
  'josephine hernandez': 1,
  'baldwin de leon': 1
};

const normalizeName = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const parseSeatList = (raw?: string): Record<string, number> => {
  if (!raw) return {};
  const delimiter = raw.includes('|') ? '|' : raw.includes(';') ? ';' : '\n';
  return raw
    .split(delimiter)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce<Record<string, number>>((acc, entry) => {
      const [namePart, countPart] = entry.split('=').map((part) => part.trim());
      if (!namePart) return acc;
      const count = Number.parseInt(countPart || '1', 10);
      acc[normalizeName(namePart)] = Number.isFinite(count) && count > 0 ? count : 1;
      return acc;
    }, {});
};

const RESERVED_SEATS: Record<string, number> = {
  ...DEFAULT_RESERVED_SEATS,
  ...parseSeatList(process.env.RSVP_SEAT_LIST)
};

export async function POST(request: Request) {
  const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!endpoint) {
    return NextResponse.json(
      { error: 'Missing GOOGLE_APPS_SCRIPT_URL.' },
      { status: 500 }
    );
  }

  let payload: RsvpPayload;
  try {
    payload = (await request.json()) as RsvpPayload;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!payload?.name || !payload?.email) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const normalizedName = normalizeName(payload.name);
  const reservedSeats = RESERVED_SEATS[normalizedName];
  const enrichedPayload = {
    ...payload,
    guests: reservedSeats ? String(reservedSeats) : 'Unlisted'
  };

  const secret = process.env.RSVP_SHARED_SECRET;
  const forwardPayload = secret ? { ...enrichedPayload, secret } : enrichedPayload;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forwardPayload),
      cache: 'no-store'
    });

    const rawText = await response.text();
    let result: any = null;
    if (rawText) {
      try {
        result = JSON.parse(rawText);
      } catch (error) {
        result = { ok: true, raw: rawText };
      }
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Apps Script rejected the request.', detail: result ?? rawText },
        { status: 502 }
      );
    }

    if (result && typeof result === 'object' && 'ok' in result && result.ok === false) {
      return NextResponse.json(
        { error: result.error || 'Apps Script returned an error.', detail: result },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reach Apps Script.' },
      { status: 500 }
    );
  }
}

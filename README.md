# MindMate+

Mental health companion app with AI Mira, mood tracking, community, and booking.

## Features
- **🚨 Tombol Darurat (Emergency Support)**: Fixed red panic button (bottom-right). Offline: vibration, alert sound, 4-7-8 breathing, 5-4-3-2-1 grounding, Indonesian hotlines (Kemenkes 119, Into The Light, KPSI). Tracks activations.
- **Mira AI**: Empathetic Indonesian mental health chatbot at `/mira`
- Mood tracking with charts
- Google Auth
- Responsive UI

## Setup
1. `cp .env.example .env` & fill values (DB, OpenAI key, Google OAuth)
2. `npm install`
3. `npx prisma db push`
4. `npm run dev`

## Mira AI Usage
1. Login via Google
2. Visit http://localhost:3000/mira
3. Chat in Indonesian, e.g. "Aku merasa sangat lelah dengan tugas sekolah hari ini."
4. Mira responds empathetically with self-care advice, safety-checked.

**Requires:** OPENAI_API_KEY in .env.local

See TODO.md for phases.

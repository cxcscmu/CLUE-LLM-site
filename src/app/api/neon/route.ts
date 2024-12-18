// This file implements all necessary functions for connecting to the online neon server and adding information to it.
// The POST request that submits data to the server.

// Anything else...? Maybe an option to get your own data from the server if you input your unique conversation ID, returned by the above?

import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(req: Request) {
  try {
    let { hist } = await req.json();
    // console.log(hist);

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    const query = `
        INSERT INTO clue_llm."Conversations" (worker_id, session_model, session, session_start, session_end, interview_model, interview, interview_start, interview_end)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING uid;
    `;
    const values = [
      hist.workerID ? hist.workerID : "No worker ID given.",
      hist.sessionModel,
      JSON.stringify(hist.session),
      hist.sessionStart,
      hist.sessionEnd,
      hist.interviewModel,
      JSON.stringify(hist.interview),
      hist.interviewStart,
      hist.interviewEnd,
    ];
    const result = await client.query(query, values);

    await client.end();
    // console.log(5)
    return NextResponse.json(
      {
        success: true,
        message: `Conversations successfully added to database under UID ${result}`,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        message: "Connection to database failed.",
      },
      { status: 500 },
    );
  }
}

// This file implements all necessary functions for connecting to the online neon server and adding information to it.
// The POST request that submits data to the server.
// The GET request that gets an unused password.
// The checkPassword function will be called from the password API.

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
        INSERT INTO clue_llm."ChatOnlyConversations" (
          worker_id,
          session_model,
          session,
          session_start,
          session_end,
          interview_model,
          interview,
          interview_start,
          interview_end)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (worker_id, session_start)
          DO UPDATE SET
            session_model = EXCLUDED.session_model,
            session = EXCLUDED.session,
            session_start = EXCLUDED.session_start,
            session_end = EXCLUDED.session_end,
            interview_model = EXCLUDED.interview_model,
            interview = EXCLUDED.interview,
            interview_start = EXCLUDED.interview_start,
            interview_end = EXCLUDED.interview_end
        RETURNING uid;
    `;
    // const query = `
    //     INSERT INTO clue_llm."ChatOnlyConversations" (
    //       worker_id,
    //       session_model,
    //       session,
    //       session_start,
    //       session_end)
    //     VALUES ($1, $2, $3, $4, $5)
    //     ON CONFLICT (worker_id, session_start)
    //       DO UPDATE SET
    //         session_model = EXCLUDED.session_model,
    //         session = EXCLUDED.session,
    //         session_end = EXCLUDED.session_end
    //     RETURNING uid;
    // `;
    const values = [
      hist.workerID ? hist.workerID : "No worker ID given.",
      hist.sessionModel,
      JSON.stringify(hist.session),
      hist.sessionStart,
      hist.sessionEnd,
      hist.interview_model,
      JSON.stringify(hist.interview),
      hist.interview_start,
      hist.interview_end
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

export async function GET() {
  // This needs to connect to the Neon database and get a list of all reserved passwords, then mark one of them as given and return that password.

  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    const query = `SELECT * FROM clue_llm."Passwords" WHERE given = false;`;
    const result = await client.query(query);

    if (result.rowCount) {
      const rows = result.rows;
      const randomIndex = Math.floor(Math.random() * rows.length);
      const password = rows[randomIndex].password;

      const update = `UPDATE clue_llm."Passwords" SET given = True WHERE password = $1`;
      const update_result = await client.query(update, [password]);

      await client.end();
      return NextResponse.json({ password: password });
    } else {
      await client.end();
      return NextResponse.json({ success: false });
    }

    await client.end();
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

export async function PUT(req: Request) {
  // This needs to accept a password, then connect to the Neon database to see if that password is found there. If not, or if that password is marked as used, return False - otherwise, mark the password as used and return True.

  const { password } = await req.json();

  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    const query = `SELECT * FROM clue_llm."Passwords"
    WHERE password = $1;`;
    const result = await client.query(query, [password]);
    // console.log(result)
    if (result.rowCount) {
      const row = result.rows[0];
      // console.log(row)

      if (!row.used && row.given) {
        const update = `UPDATE clue_llm."Passwords" SET used = True WHERE password = $1`;
        const update_result = await client.query(update, [password]);
        await client.end();
        return NextResponse.json({ success: true });
      } else {
        await client.end();
        return NextResponse.json({ success: false });
      }
    } else {
      await client.end();
      return NextResponse.json({ success: false });
    }
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

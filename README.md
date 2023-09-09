## Getting Started

Clone repo and open on preferred editor.

First, install dependencies.

```bash
npm install
```

Next, create a `.env.local` file and connect to a mongo database.
The inside of the file should have the following:

```bash
MONGODB_URI='your mongoDB url'

AUTH0_SECRET='your own string'
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL='https://dev-[this is from your auth0 account].us.auth0.com'
AUTH0_CLIENT_ID='your auth0 id'
AUTH0_CLIENT_SECRET='your auth0 secret'

OPENAI_API_KEY='your own api key from openai'
```

Finally, run

```bash
npm run dev
```

and the project should function.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

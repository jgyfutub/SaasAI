// import type {Config} from 'drizzle-kit'
// import * as dotenv from 'dotenv'
// dotenv.config({path:'.env'})
// export default  {
//     driver:"pg",
//     schema:'./src/lib/db/schema.ts',
//     dbCredentials:{
//         connectionString:process.env.DATABASE_URL
//     }
// } satisfies Config;
import { defineConfig, type Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default defineConfig({
dialect: "postgresql",
schema: '/Users/kalashnikov/Desktop/SaasAi/chatpdf-yt/src/app/lib/db/schema.ts',
out: "./drizzle",
driver: "pg",
dbCredentials: {
host: "ep-steep-math-a1b0ejem.ap-southeast-1.aws.neon.tech",
password:process.env.PASSWORD!,
port:process.env.DATABASE_URL,
database:"neondb",
user:"neondb_owner",
ssl:"true"
},
} as Config);

import cors from "cors";
import 'dotenv/config';
import { z } from "zod";

const corsOptions = process.env.MODE === 'development'
    ? {
        origin: [
            /http:\/\/localhost:\d+$/,
            ...getAllowedOrigins(),
        ],
    }
    : {
        origin: getAllowedOrigins(),
    };

export const corsManager = cors(corsOptions);


function getAllowedOrigins(): string[] {
    const envAllowedOrigins = process.env.ALLOWED_ORIGINS;
    if (!envAllowedOrigins) {
        return [];
    }

    const urlArray = envAllowedOrigins.split(',');
    const validated = z.array(z.string().url()).safeParse(urlArray);
    if (validated.success) {
        return validated.data;
    } else {
        console.error('Error: invalid list of allowed origins in env\n', validated.error);
        return [];
    }
}
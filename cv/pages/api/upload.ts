// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Formidable } from "formidable";

type Data = {
    name: string;
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "128mb",
        },
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Get the form data from the request
    const form = new Formidable();
    console.log("Formidable");
    const [fields, files] = await form.parse(req);
    console.log("Fields", fields);
    console.log("Files", files);

    res.status(200).json({ name: "John Doe" });
}

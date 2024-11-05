import type { Request, Response } from "express";
const Controller = async (req: Request, res: Response) => {
    // do something
    res.json({ message: "Hello World" });
};

export default Controller;

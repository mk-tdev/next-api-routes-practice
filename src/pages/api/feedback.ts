// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path from "path";

type Data = {
  name: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "POST") {
    const { name, feedback } = req.body;
    // Store the feedback in a database or perform any other desired actions
    const newFeedback = {
      name: name,
      feedback: feedback,
      id: new Date().toISOString(),
    };

    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = fs.readFileSync(filePath, "utf8");

    let feedbackData = JSON.parse(fileData) || [];
    feedbackData.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(feedbackData));

    res.status(201).json({ message: "Feedback received successfully" });
  } else if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const feedbackData = JSON.parse(fileData) || [];
    res.status(200).json(feedbackData);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;

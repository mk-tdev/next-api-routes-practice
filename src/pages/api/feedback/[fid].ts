// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path from "path";

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { fid } = req.query;

  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const feedbackData = JSON.parse(fileData) || [];

  if (req.method === "GET") {
    const feedback = feedbackData.find((item: any) => item.id === fid);
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } else if (req.method === "DELETE") {
    const filteredFeedbackData = feedbackData.filter(
      (item: any) => item.id !== fid
    );
    fs.writeFileSync(filePath, JSON.stringify(filteredFeedbackData));
    res.status(200).json({ message: "Feedback deleted" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;

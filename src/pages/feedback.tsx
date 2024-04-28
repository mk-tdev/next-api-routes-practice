import fs from "fs";
import path from "path";
import { useState } from "react";

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(filePath, "utf8");

  let feedbackData = JSON.parse(fileData);

  if (!feedbackData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      feedbacks: feedbackData,
      revalidate: 100,
    },
  };
};

const Feedback = ({ feedbacks }: any) => {
  const [selectedFeedbackData, setSelectedFeedbackData] = useState<any>(null);

  const loadFeedback = (fid: any) => {
    // Fetch feedback details using the fid
    fetch(`/api/feedback/${fid}`)
      .then((res) => res.json())
      .then((data: any) => {
        // Handle the fetched feedback data
        setSelectedFeedbackData(data);
        // Display the feedback details or update the UI as needed
      });
  };

  return (
    <div>
      <>
        {selectedFeedbackData && (
          <>
            {/* Render the selected feedback details */}
            <div className="bg-gray-950 text-white p-4 rounded-md shadow-md my-4">
              <h3 className="font-bold">{selectedFeedbackData?.name}</h3>
              <p>{selectedFeedbackData?.feedback}</p>
              <button
                onClick={() => setSelectedFeedbackData(null)}
                className="my-2 p-2 bg-slate-600 text-white rounded-md hover:bg-slate-700"
              >
                Clear
              </button>
            </div>
          </>
        )}
      </>

      {feedbacks && (
        <>
          {feedbacks.map((feedback: any) => (
            <div
              key={feedback.id}
              className="bg-gray-100 p-4 rounded-md shadow-md my-4"
            >
              <h3 className="font-bold">{feedback.name}</h3>
              <p>{feedback.feedback}</p>

              <button
                onClick={loadFeedback.bind(null, feedback.id)}
                className="my-2 p-2 bg-slate-600 text-white rounded-md hover:bg-slate-700"
              >
                Get Details
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Feedback;

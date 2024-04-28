import fs from "fs";
import path from "path";

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
  return (
    <div>
      {feedbacks && (
        <>
          {feedbacks.map((feedback: any) => (
            <div
              key={feedback.id}
              className="bg-gray-100 p-4 rounded-md shadow-md my-4"
            >
              <h3 className="font-bold">{feedback.name}</h3>
              <p>{feedback.feedback}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Feedback;

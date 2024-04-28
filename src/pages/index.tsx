import { useEffect, useRef, useState } from "react";

export default function Home() {
  const nameRef = useRef<any>("");
  const descRef = useRef<any>("");
  const [feedbackData, setFeedbackData] = useState<any[]>([]);

  const fetchAndSet = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbackData(data));
  };

  useEffect(() => {
    // Fetch data or perform any other side effects here
    const fetchData = async () => {
      try {
        const response = await fetch("/api/feedback");
        const data = await response.json();
        setFeedbackData(data);
      } catch (e) {}
    };

    fetchData();
  }, []);

  const postFeedback = () => {
    const name = nameRef.current?.value || "";
    const feedback = descRef.current?.value || "";

    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, feedback }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Feedback submitted successfully:", data);
        // Reset the input fields
        nameRef.current.value = "";
        descRef.current.value = "";
        fetchAndSet();
      });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postFeedback();
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={onSubmitHandler}>
        <div className="flex flex-col">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            ref={nameRef}
            id="name"
            name="name"
            required
            className="border-2 border-gray-300 p-2 rounded-md"
          />

          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            ref={descRef}
            required
            name="feedback"
            className="border-2 border-gray-300 p-2 rounded-md"
          ></textarea>

          <button
            className="bg-green-800 text-white my-3 p-3 shadow-md"
            type="submit"
          >
            Submit Feedback
          </button>
        </div>
      </form>

      <div className="mt-8">
        {feedbackData.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-gray-100 p-4 rounded-md shadow-md my-4"
          >
            <h3 className="font-bold">{feedback.name}</h3>
            <p>{feedback.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

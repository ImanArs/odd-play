"use client";

import { useState, useEffect } from "react";
import { BackButton } from "./back-button";
import { Modal } from "./modal";
import { Countdown } from "./countdown";
import { Clock, Trophy } from "lucide-react";

interface QuizSectionProps {
  onBack: () => void;
  onQuizComplete: (score: number) => void;
}

interface QuizQuestion {
  id: number;
  image: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?cs=srgb&dl=pexels-pixabay-274422.jpg&fm=jpg",
    question: "What sport uses this equipment?",
    options: ["Basketball", "Football", "Tennis", "Swimming"],
    correctAnswer: 1,
  },
  {
    id: 2,
    image:
      "https://t4.ftcdn.net/jpg/00/62/39/19/360_F_62391976_WKbOA72PbU28IAfUjn6tLAPz3e2IVxdr.jpg",
    question: "Which sport is played on this court?",
    options: ["Football", "Tennis", "Basketball", "Volleyball"],
    correctAnswer: 2,
  },
  {
    id: 3,
    image:
      "https://media.istockphoto.com/id/901967648/photo/tennis-racket.jpg?s=612x612&w=0&k=20&c=2TyEfVwNHXRVRuL_Huo5PH7CZrJQifZzUoOYChC0dhk=",
    question: "What sport uses this equipment?",
    options: ["Badminton", "Tennis", "Squash", "Table Tennis"],
    correctAnswer: 1,
  },
  {
    id: 4,
    image:
      "https://media.istockphoto.com/id/1318657540/vector/swimming-goggles-illustration.jpg?s=612x612&w=0&k=20&c=khdyUFilrFz4tIQcnE621x7byHZVob2FVyy1739bcDg=",
    question: "This equipment is used in which sport?",
    options: ["Swimming", "Diving", "Water Polo", "All of the above"],
    correctAnswer: 3,
  },
  {
    id: 5,
    image:
      "https://st.depositphotos.com/1637787/3487/i/450/depositphotos_34875643-stock-photo-runners-shoes.jpg",
    question: "These are primarily designed for which activity?",
    options: ["Walking", "Running", "Dancing", "Hiking"],
    correctAnswer: 1,
  },
  {
    id: 6,
    image:
      "https://media.istockphoto.com/id/1371823675/photo/bad-shot.jpg?s=612x612&w=0&k=20&c=JK8hNxPDZ1CQKLHCm17-KrLrb0KOcT3D5jbzYtkk40c=",
    question: "What sport is this ball used for?",
    options: ["Basketball", "Football", "Volleyball", "Handball"],
    correctAnswer: 2,
  },
  {
    id: 7,
    image:
      "https://t4.ftcdn.net/jpg/02/40/40/63/360_F_240406332_zWwqcaYVr2UAKZF4Phk0XU0F9FnBRZeH.jpg",
    question: "This equipment belongs to which sport?",
    options: ["Hockey", "Lacrosse", "Field Hockey", "All of the above"],
    correctAnswer: 3,
  },
  {
    id: 8,
    image:
      "https://media.istockphoto.com/id/154039018/photo/golf.jpg?s=612x612&w=0&k=20&c=vR-PCuW__Nc_LVG306c15fVVcElclc0g6tNBcIjXnsI=",
    question: "What sport uses this small white ball?",
    options: ["Tennis", "Golf", "Ping Pong", "Baseball"],
    correctAnswer: 1,
  },
  {
    id: 9,
    image:
      "https://media.istockphoto.com/id/187858328/photo/red-leather-boxing-gloves-isolated-on-white.jpg?s=612x612&w=0&k=20&c=mbtFoDGcpMemi9bUWH6x1Y-T3F8o6JBVuMCk0Luzj8k=",
    question: "These gloves are used in which sport?",
    options: ["Boxing", "MMA", "Kickboxing", "All of the above"],
    correctAnswer: 3,
  },
  {
    id: 10,
    image:
      "https://www.shutterstock.com/image-photo/three-wood-baseball-bats-on-600nw-2611137433.jpg",
    question: "This equipment is used in which sport?",
    options: ["Cricket", "Baseball", "Softball", "Baseball and Softball"],
    correctAnswer: 3,
  },
  {
    id: 11,
    image:
      "https://media.istockphoto.com/id/178457302/photo/white-pair-of-soccer-shoes-in-white-background.jpg?s=612x612&w=0&k=20&c=EZdbgQb13IZ2kJIURq3YECI498cDXUGyD5jWkfMdQBY=",
    question: "These shoes are designed for which sport?",
    options: [
      "Football/Soccer",
      "Rugby",
      "American Football",
      "All of the above",
    ],
    correctAnswer: 3,
  },
  {
    id: 12,
    image:
      "https://t3.ftcdn.net/jpg/15/47/32/78/360_F_1547327864_tfZE9vqIWdVaG5GB0nf1HA07Hk0Z03Ao.jpg",
    question: "This is used in which racket sport?",
    options: ["Tennis", "Squash", "Badminton", "Table Tennis"],
    correctAnswer: 2,
  },
  {
    id: 13,
    image:
      "https://www.shutterstock.com/image-photo/green-mountain-bike-helmet-adjustable-600nw-2479903259.jpg",
    question: "This safety equipment is essential for which activity?",
    options: ["Cycling", "Skateboarding", "Rollerblading", "All of the above"],
    correctAnswer: 3,
  },
  {
    id: 14,
    image:
      "https://t4.ftcdn.net/jpg/10/42/25/41/360_F_1042254115_Uzy28Jhgrn7mJnbfEo9wMyT7H2GYVOEy.jpg",
    question: "This surface is used for which combat sport?",
    options: ["Boxing", "Wrestling", "Judo", "Wrestling and Judo"],
    correctAnswer: 3,
  },
  {
    id: 15,
    image:
      "https://t3.ftcdn.net/jpg/00/70/52/62/360_F_70526284_QfL2lC9fqwOOFgSfwMTY0aOSziiNa8Lr.jpg",
    question: "This target is used in which precision sport?",
    options: ["Archery", "Darts", "Shooting", "Archery and Shooting"],
    correctAnswer: 0,
  },
];

const ANSWER_COLORS = [
  "from-red-400 to-red-600 border-red-700", // Red
  "from-blue-400 to-blue-600 border-blue-700", // Blue
  "from-yellow-400 to-yellow-600 border-yellow-700", // Yellow
  "from-green-400 to-green-600 border-green-700", // Green
];

export function QuizSection({ onBack, onQuizComplete }: QuizSectionProps) {
  const [showCountdown, setShowCountdown] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (showCountdown) {
      const timer = setTimeout(() => {
        setShowCountdown(false);
        setGameStarted(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showCountdown]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showGameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      // Time's up!
      setGameOverReason("Time's up! You didn't answer in time.");
      onQuizComplete(score);
      setShowGameOver(true);
    }
  }, [timeLeft, gameStarted, showGameOver, score]);

  const handleAnswerClick = (selectedAnswer: number) => {
    if (!gameStarted || showGameOver) return;

    const question = QUIZ_QUESTIONS[currentQuestion];

    if (selectedAnswer === question.correctAnswer) {
      const newScore = score + 1;
      setScore(newScore);

      // Correct answer
      if (currentQuestion + 1 >= QUIZ_QUESTIONS.length) {
        // Quiz completed successfully!
        setGameOverReason(
          `Amazing! You got ${newScore} out of ${QUIZ_QUESTIONS.length} questions correct!`
        );
        onQuizComplete(newScore);
        setShowGameOver(true);
      } else {
        // Move to next question
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(10);
      }
    } else {
      // Wrong answer
      setGameOverReason(
        `You got ${score} out of ${
          currentQuestion + 1
        } questions correct. Better luck next time!`
      );
      onQuizComplete(score);
      setShowGameOver(true);
    }
  };

  const handleGameOverClose = () => {
    setShowGameOver(false);
    onBack();
  };

  if (showCountdown) {
    return <Countdown />;
  }

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progressPercentage = ((10 - timeLeft) / 10) * 100;

  return (
    <div className="min-h-screen relative p-6 pt-20 bg-gradient-to-b from-blue-300 to-blue-200">
      <BackButton onBack={onBack} />

      <div className="max-w-md mx-auto">
        {/* Progress and Timer */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-black text-purple-800">
              Question {currentQuestion + 1}/{QUIZ_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-2 text-purple-800">
              <Clock size={20} />
              <span className="text-xl font-black">{timeLeft}s</span>
            </div>
          </div>

          {/* Timer bar */}
          <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden border-2 border-purple-300">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-red-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="cartoon-card p-6 mb-6">
          <img
            src={question.image || "/placeholder.svg"}
            alt="Quiz question"
            className="w-full h-48 object-cover rounded-2xl mb-4 border-2 border-purple-200"
          />
          <h3 className="text-xl font-black text-purple-800 text-center">
            {question.question}
          </h3>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`
                p-4 rounded-2xl border-4 font-bold text-lg text-white
                bg-gradient-to-b ${ANSWER_COLORS[index]}
                shadow-xl hover:scale-105 active:scale-95
                transition-all duration-200 ease-out
                text-center
              `}
            >
              {/* Top highlight */}
              <div className="absolute inset-x-3 top-1 h-2 bg-white/30 rounded-full" />
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Game Over Modal */}
      <Modal
        isOpen={showGameOver}
        onClose={() => {}}
        title="Quiz Complete!"
        showCloseButton={false}
      >
        <div className="text-center">
          <div className="mb-4">
            <Trophy size={48} className="text-yellow-500 mx-auto mb-2" />
            <div className="text-3xl font-black text-purple-800">
              {score}/{QUIZ_QUESTIONS.length}
            </div>
          </div>
          <p className="text-lg font-bold text-gray-700 mb-6">
            {gameOverReason}
          </p>
          <button
            onClick={handleGameOverClose}
            className="
              px-6 py-3 rounded-2xl font-bold text-lg
              bg-gradient-to-b from-purple-400 to-purple-600
              border-3 border-purple-700
              text-white shadow-lg
              hover:scale-105 active:scale-95
              transition-all duration-200
            "
          >
            Got it!
          </button>
        </div>
      </Modal>
    </div>
  );
}

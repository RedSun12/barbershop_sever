import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    GridItem,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Text,
  Container,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchThemes, fetchQuestions } from '../../redux/thunkActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { setSelectedQuestion } from '../../redux/gamesSlice';
import { Themes, Questions } from '../../types/statesTypes';
import styles from './GamePage.module.css';
import { useAppSelector } from '../../redux/hooks';
import axiosInstance from '../../axiosInstance';

export default function GamePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ id: number; correct: boolean }[]>([]);
  const {user} = useSelector((state: RootState) => state.userSlice);
  const dispatch = useDispatch();
  const themes: Themes[] = useSelector(
    (state: RootState) => state.gamesSlice.themes
  );
  const questions: Questions[] = useSelector(
    (state: RootState) => state.gamesSlice.questions
  );
  const selectedQuestion = useSelector(
    (state: RootState) => state.gamesSlice.selectedQuestion
  );

  useEffect(() => {
    dispatch(fetchThemes());
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            handleTimeOut();
            clearInterval(timer);
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  const handleQuestionClick = (question: Questions) => {
    if (answeredQuestions.find((q) => q.id === question.id)) return;
    dispatch(setSelectedQuestion(question));
    setAnswer("");
    setTimeLeft(30);
    onOpen();
  };

  const handleTimeOut = () => {
    if (selectedQuestion) {
      setAnsweredQuestions((prev) => [
        ...prev,
        { id: selectedQuestion.id, correct: false },
      ]);
      alert("Упс! Время вышло ");
      onClose();
    }
  };

  const handleSubmit = async () => {
    // `${import.meta.env.VITE_API}/themes`
    if (selectedQuestion) {
      const isAnswerCorrect = answer.toLowerCase() === selectedQuestion.answer.toLowerCase();
      
      if (isAnswerCorrect) {
        // await axiosInstance.post(`${import.meta.env.VITE_API}/user/${user?.id}`, {score: user.score + selectedQuestion.scoreQ});
        setScore((e) => Number(e) + Number(selectedQuestion.scoreQ));
      } else {
        // await axiosInstance.post(`${import.meta.env.VITE_API}/user/${user?.id}`, {score:  user.score - selectedQuestion.scoreQ});
        setScore((e) => e - selectedQuestion.scoreQ);
      }
      setAnsweredQuestions((prev) => [...prev, { id: selectedQuestion.id, correct: isAnswerCorrect }]);
      onClose();
    }
    };

  const getQuestionColor = (questionId: number) => {
    const answered = answeredQuestions.find((q) => q.id === questionId);
    if (answered) {
      return answered.correct ? "green.500" : "red.500";
    }
    return "blue.500";
  };

  // const user = useAppSelector()
  console.log(user);

  return (
    <Box className={styles.allQ} p={4}>
      <Text fontWeight="bold" mb={4}>Счёт: {score}</Text>
      <Grid display={'block'} templateColumns={`repeat(${themes.length}, 1fr)`} gap={4}>
        {themes.map((theme: Themes) => (
          <GridItem className={styles.card} key={theme.id}>
              <Container className={styles.asq}>
                {theme.topic}
              </Container>
            {/* <Text fontWeight="bold">{theme.topic}</Text> */}
            {questions
              .filter((question: Questions) => question.themeId === theme.id)
              .map((question: Questions, index) => (
                <>
                <Button
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  isDisabled={answeredQuestions.some(
                    (q) => q.id === question.id
                  )}
                  textDecoration={
                    answeredQuestions.some((q) => q.id === question.id)
                      ? "line-through"
                      : "none"
                  }
                  bg={getQuestionColor(question.id)}
                  color="white"
                  m={1}
                >
                  {(index+1) * 100}
                  {/* {question.score} */}
                </Button>
                </>
              ))}
          </GridItem>
        ))}
      </Grid>

      {selectedQuestion && (
  <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent maxWidth="800px" maxHeight="600px" padding="20px">
    <ModalHeader fontSize="24px" color="black" padding="20px">
      {selectedQuestion.question}
    </ModalHeader>
    <ModalCloseButton color="black" size="lg" />
    <ModalBody padding="20px" color="black">
      <div>
        <Text mb={4} fontSize="18px" color="black">
          <FontAwesomeIcon
            icon={faClock}
            spin
            style={{
              color: "#4b8ce2",
              fontSize: "24px",
              marginRight: "8px",
            }}
          />
          Прошло времени: {timeLeft} секунд
        </Text>
      </div>

      <Input
        placeholder="Твой ответ"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        color="black"
        borderColor="#3498db"
        borderWidth="2px"
        padding="10px"
        fontSize="18px"
      />
    </ModalBody>
    <ModalFooter padding="20px">
      <Button
        colorScheme="blue"
        variant="solid"
        size="lg"
        fontSize="18px"
        padding="10px 20px"
        onClick={handleSubmit}
      >
        Ответить
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
      )}
    </Box>
  );
}

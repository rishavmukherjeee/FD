import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const TimeLimitComponent = ({ previousTime, countTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const timeLimit = countTime * 60 * 1000; // 50 minutes in milliseconds
    const startTime = new Date(previousTime).getTime();
    const endTime = startTime + timeLimit;

    const updateRemainingTime = () => {
      const currentTime = new Date().getTime();
      const remainingTime = endTime - currentTime;

      if (remainingTime > 0) {
        setTimeRemaining(remainingTime);
      } else {
        setTimeRemaining(0);
      }
    };

    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [previousTime]);

  const formatTime = (timeInMilliseconds) => {
    const minutes = Math.floor(timeInMilliseconds / (1000 * 60));
    return `${minutes.toString().padStart(2, "0")}`;
  };
  return (
    <View>
      <Text>
        {timeRemaining ? `Exp${formatTime(timeRemaining)}min` : "Expired"}{" "}
      </Text>
    </View>
  );
};

export default TimeLimitComponent;

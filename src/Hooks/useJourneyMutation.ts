import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TPostJourneys } from "../types";

const postJourney = async (data: TPostJourneys) => {
  const response = await axios
    .post("https://localhost:7076/api/Journeys", data)
    .then((res) => res.data)
    .catch((err) => err);

  return response.data;
};

export const useJourneyMutation = () => {
  const client = useQueryClient();
  const { mutate } = useMutation(postJourney, {
    onSuccess: () => {
      client.invalidateQueries(["journeys"]);
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  return { mutate };
};

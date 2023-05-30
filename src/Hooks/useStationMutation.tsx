import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TStation } from "../types";

const postStation = async (data: TStation) => {
  const response = await axios
    .post("https://localhost:7076/api/Stations", data)
    .then((res) => res.data)
    .catch((err) => err);

  return response.data;
};

export const useStationMutation = () => {
  const client = useQueryClient();
  const { mutate } = useMutation(postStation, {
    onSuccess: () => {
      client.invalidateQueries(["stations"]);
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  return { mutate };
};
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const mutation = useMutation({
  mutationFn: () => {
    return axios.post("https://localhost:7076/api/Journeys/CSV");
  },
});

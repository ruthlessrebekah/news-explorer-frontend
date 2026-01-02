import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

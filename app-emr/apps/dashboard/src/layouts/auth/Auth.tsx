import { apis } from "@/constants/apis";
import { routes } from "@/constants/routes";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyLayout from "../Empty";

export async function authorizeMe() {
  const user = await ky
    .get(apis.authMe, {
      headers: {
        user_id: localStorage?.getItem("user_id") ?? "",
      },
      credentials: "include",
    })
    .json();
  return user;
}

export default function AuthLayout() {
  const navigate = useNavigate();
  const me = useMutation({
    mutationKey: ["me"],
    mutationFn: authorizeMe,
  });

  useEffect(() => {
    me.mutateAsync().then((user) => {
      if (user) {
        navigate(routes.dashboard.root);
      }
    });
  }, []);

  return <EmptyLayout />;
}

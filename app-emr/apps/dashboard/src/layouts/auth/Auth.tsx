import { apis } from "@/constants/apis";
import { routes } from "@/constants/routes";
import { handleErrorResponse } from "@/utils/error-handlers";
import type { Me, ResponseBody } from "@repo/typescript-config";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyLayout from "../Empty";

export async function authorizeMe() {
  try {
    // console.log("authorizeMe", localStorage?.getItem("user_id"));
    const body: ResponseBody = await ky
      .get(apis.authMe, {
        headers: {
          user_id: localStorage?.getItem("user_id") ?? "",
        },
        credentials: "include",
      })
      .json();

    // console.log(body);
    if (!body) return null;
    if (body.error) throw body.error;
    const user = body.data;
    return user as Me;
  } catch (error) {
    handleErrorResponse(error);
  }
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

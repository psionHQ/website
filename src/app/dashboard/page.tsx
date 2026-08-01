import { redirect } from "next/navigation";
import { DASHBOARD_ROUTES } from "@/constants/routes";

export default function DashboardIndexPage() {
  redirect(DASHBOARD_ROUTES.overview);
}

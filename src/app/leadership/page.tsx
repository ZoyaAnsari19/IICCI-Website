import { redirect } from "next/navigation";

export default function LegacyLeadershipRedirect() {
  redirect("/about/leadership");
}

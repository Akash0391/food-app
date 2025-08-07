import { useAuthStore } from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";

export default function TabsLayout() {  
  const { isAuthenticated } = useAuthStore();

  console.log("isAuthenticated", isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
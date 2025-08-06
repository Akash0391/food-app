import { Redirect, Slot } from "expo-router";

export default function TabsLayout() {  
    const isAuthenticated = true;
    console.log("isAuthenticated", isAuthenticated);

    if (!isAuthenticated) {
        return <Redirect href="/sign-in" />;
    }

  return <Slot />;
}
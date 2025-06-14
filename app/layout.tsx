import { Outlet } from "react-router";
import Navbar from "./components/navbar";
import type { Route } from "./+types/root";
import { useNavigation } from "react-router";
 
export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Finance App" },
  ];
}



export default function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  
  return (
    <div className="flex min-h-screen w-screen">
      <div className="min-w-xs min-h-screen">
        <Navbar />
      </div>

      <div className="w-px bg-gray-400 min-h-screen" />

      <div className="flex-1 min-h-screen">
        { isNavigating ? <div>Loading...</div> : <Outlet /> }
      </div>
    </div>
  );
}

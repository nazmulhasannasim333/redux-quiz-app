import { Toaster } from "react-hot-toast";
import { NavbarDefault } from "./components/Navbar";
import { QuizTabs } from "./components/Tabs";

const App = () => {
  return (
    <div className="container mx-auto">
      <NavbarDefault />
      <QuizTabs />
      <Toaster />
    </div>
  );
};

export default App;

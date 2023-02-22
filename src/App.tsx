import { TodosProvider } from "contexts/todosContext";
import { Header } from "components/Header";
import { Main } from "components/Main";
import { Footer } from "components/Footer";

function App() {
  return (
    <TodosProvider>
      <div className="todoapp">
        <Header />
        <Main />
        <Footer />
      </div>
    </TodosProvider>
  );
}

export default App;

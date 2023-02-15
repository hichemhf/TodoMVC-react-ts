import { TodosProvider } from "contexts/todosContext";
import { Header } from "components/Header";

function App() {
  return (
    <TodosProvider>
      <div className="todoapp">
        <Header />
      </div>
    </TodosProvider>
  );
}

export default App;

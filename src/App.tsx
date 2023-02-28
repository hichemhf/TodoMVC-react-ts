import { TodosProvider } from "contexts/todosContext";
import { Header } from "components/Header";
import { Main } from "components/Main";
import { Footer } from "components/Footer";

function App() {
  return (
    <TodosProvider>
      <section className="todoapp">
        <div>
          <Header />
          <Main />
          <Footer />
        </div>
      </section>
    </TodosProvider>
  );
}

export default App;

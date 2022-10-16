import { ChangeEvent, FormEvent, useState } from "react";
import { Header } from "./components/Header";

import { Clipboard, PlusCircle } from "phosphor-react";

import "./global.css";
import styles from "./App.module.css";
import { List } from "./components/List";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState<string[]>([]);

  function handleDeleteTodo(e: any) {
    const textValue = e.target.innerText;

    const newTextValue = todoList.filter((todo) => {
      return todo !== textValue;
    });

    setTodoList(newTextValue);
  }

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTodo(event.target.value);
  }

  const handleCreateNewTodoList = (event: FormEvent) => {
    event.preventDefault();
    setTodoList((state) => [...state, newTodo]);
    setNewTodo("");
  };

  return (
    <div>
      <Header />
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleCreateNewTodoList}>
          <input
            type="text"
            value={newTodo}
            onChange={handleNewTodoChange}
            placeholder="Adicione uma nova tarefa"
          />

          <button type="submit">
            {!todoList.length && "Criar"}
            <PlusCircle size={20} />
          </button>
        </form>

        <div>
          <div className={styles.info}>
            <div>
              <span className={styles.newTask}>Tarefas criadas</span>
              <span className={styles.numberIndicator}>{todoList.length}</span>
            </div>
            <div>
              <span className={styles.finishedTask}>Concluídas</span>
              <span className={styles.numberIndicator}>0</span>
            </div>
          </div>
          <div className={styles.content}>
            {!todoList.length ? (
              <div className={styles.emptyTodo}>
                <Clipboard size={56} />
                <span className={styles.title}>
                  Você ainda não tem tarefas cadastradas
                </span>
                <span className={styles.text}>
                  Crie tarefas e organize seus itens a fazer
                </span>
              </div>
            ) : (
              <ul>
                {todoList.map((item, key) => (
                  <List text={item} key={key} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Header } from "./components/Header";

import { Clipboard, PlusCircle } from "phosphor-react";

import { v4 as uuidv4 } from "uuid";

import "./global.css";
import styles from "./App.module.css";
import { List } from "./components/List";

export type Todo = {
  id: string;
  task: string;
  isChecked: boolean;
};

function App() {
  const initialData = { id: "", task: "", isChecked: false };
  const [newTodo, setNewTodo] = useState<Todo>(initialData);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  function handleDeleteTodo(item: Todo) {
    const newValue = todoList.filter((todo) => {
      return todo.id !== item.id;
    });
    setTodoList(newValue);
  }

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTodo({ id: uuidv4(), task: event.target.value, isChecked: false });
  }

  const handleCreateNewTodoList = (event: FormEvent) => {
    event.preventDefault();
    setTodoList((state) => [...state, newTodo]);
    setNewTodo({ id: "", task: "", isChecked: false });
  };

  const handleChecked = (item: Todo) => {
    const newArray = [...todoList];
    newArray.forEach((element, index) => {
      if (element.id === item.id) {
        newArray[index].isChecked = !item.isChecked;
      }
    });
    setTodoList(newArray);
  };

  const checked = todoList.filter((item) => item.isChecked === true);

  return (
    <div>
      <Header />
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleCreateNewTodoList}>
          <input
            type="text"
            value={newTodo.task}
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
              <span className={styles.numberIndicator}>
                <>
                  {checked.length} de {todoList.length}
                </>
              </span>
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
                {todoList.map((item) => (
                  <List
                    text={item}
                    key={item.id}
                    handleChecked={() => handleChecked(item)}
                    checked={item.isChecked}
                    handleDeleteTodo={() => handleDeleteTodo(item)}
                  />
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

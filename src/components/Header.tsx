import styles from "./Header.module.css";

import todoListLogo from "../assets/todo-list-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={todoListLogo} alt="Logo tipo para o site todo list" />
    </header>
  );
}

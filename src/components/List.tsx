import { CheckCircle, Circle, Trash } from "phosphor-react";
import { Todo } from "../App";
import style from "./List.module.css";

interface ListProps {
  text: Todo;
  checked: boolean;
  handleChecked: () => void;
  handleDeleteTodo: () => void;
}

export function List({
  text,
  handleChecked,
  checked = false,
  handleDeleteTodo,
}: ListProps) {
  return (
    <div className={style.list}>
      <div className={style.listCheckbox}>
        {!checked ? (
          <span onClick={handleChecked}>
            <Circle size={20} id={text.id} className={style.icon} />
          </span>
        ) : (
          <span onClick={handleChecked}>
            <CheckCircle
              size={20}
              weight="fill"
              id={text.id}
              className={style.icon}
            />
          </span>
        )}
      </div>
      <span
        className={style.text}
        style={checked ? { textDecoration: "line-through" } : {}}
      >
        {text.task}
      </span>
      <div className={style.trash} onClick={handleDeleteTodo}>
        <Trash size={18} />
      </div>
    </div>
  );
}

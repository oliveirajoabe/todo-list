import { Trash } from "phosphor-react";
import style from "./List.module.css";

interface ListProps {
  text: string;
}

export function List({ text }: ListProps) {
  return (
    <div className={style.list}>
      <div className={style.listCheckbox}>
        <input type="checkbox" />
      </div>
      <span className={style.text}>{text}</span>
      <div className={style.trash}>
        <Trash size={18} />
      </div>
    </div>
  );
}

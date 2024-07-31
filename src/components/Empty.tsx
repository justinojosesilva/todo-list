import { Clipboard } from "phosphor-react";
import styles from "./Empty.module.css"

export function Empty() {
  return (
    <div className={styles.empty}>
      <Clipboard size={56} />
      <div>
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  )
}
import { CheckCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import styles from './Editable.module.scss'

type EditableProps = {
  text: string;
  handleOnSave: (updatedValue: string) => void;
}

export const Editable = ({ text, handleOnSave: handleOnSaveProp }: EditableProps) => {
  const [editing, setEditing] = useState(false);
  const [updatedValue, setUpdatedValue] = useState('');

  const handleOnSave = () => {
    handleOnSaveProp(updatedValue);
    setEditing(false);
  }

  return (
    <div className={styles.Editable}>
      {
        editing ? (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSave();
            }}
          >
            <input
              className={styles.input}
              autoFocus id="editable-text"
              onChange={(e) => setUpdatedValue(() => e.target.value)}
              onBlur={handleOnSave}
            />
          </form>

        ) : (
          <p className={styles.text}>{text}</p>
        )
      }
      {
        editing ? (
          <CheckCircledIcon className={styles.check} />
        ) : (
          <Pencil1Icon className={styles.pencil} onClick={() => setEditing((prev) => !prev)} />
        )
      }
    </div>
  )
}

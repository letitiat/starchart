import { Dialog } from "radix-ui";
import styles from './Modal.module.scss';
import { Button } from "../button/Button";
import { Cross2Icon } from "@radix-ui/react-icons";

type ModalProps = {
  triggerButtonTitle: string,
  modalTitle: string,
  modalDescription: string,
  children: JSX.Element,
  handleOnClose: () => void,
  saveButton?: string,
}

export const Modal = ({
  triggerButtonTitle,
  modalTitle,
  modalDescription,
  children,
  handleOnClose,
  saveButton = 'Add Task',
}: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="primary">{triggerButtonTitle}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>{modalTitle}</Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>{modalDescription}</Dialog.Description>
          
          {children}

          <div
            style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
          >
            <Dialog.Close asChild onClick={handleOnClose}>
              <Button variant="secondary" >{saveButton}</Button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
					<button className={styles.IconButton} aria-label="Close">
						<Cross2Icon />
					</button>
				</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>

  )
}
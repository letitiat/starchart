import { Dialog } from "radix-ui";
import styles from './Modal.module.scss';
import { Button } from "../button/Button";
import { Cross2Icon } from "@radix-ui/react-icons";

type ModalProps = {
  modalTitle: string,
  children: JSX.Element,
  handleOnClose: () => void,
  modalDescription?: string,
  triggerButtonTitle?: string,
  saveButton?: string,
  isOpen?: boolean,
}

export const Modal = ({
  triggerButtonTitle,
  modalTitle,
  modalDescription,
  children,
  handleOnClose,
  saveButton,
  isOpen = false,
}: ModalProps) => {

  return (
    <Dialog.Root defaultOpen={isOpen} onOpenChange={handleOnClose}>
      {
        triggerButtonTitle && (
          <Dialog.Trigger asChild>
            <Button variant="primary">{triggerButtonTitle}</Button>
          </Dialog.Trigger>
        )
      }
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>{modalTitle}</Dialog.Title>
          {
            modalDescription && (
              <Dialog.Description className={styles.DialogDescription}>
                {modalDescription}
              </Dialog.Description>
            )
          }
          {children}
          <div
            style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
          >
            {
              saveButton && (
                <Dialog.Close asChild onClick={handleOnClose}>
                  <Button variant="secondary" >{saveButton}</Button>
                </Dialog.Close>
              )
            }
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
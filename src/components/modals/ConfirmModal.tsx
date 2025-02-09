import { Modal, Text, Button, Image, Group } from "@mantine/core";
import trash from "../../assets/trash.svg";
import { FormConstants } from "../../utils/constants";

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title = FormConstants.deleteModalTitle,
  message = FormConstants.confirmDeleteMessage,
  confirmText = FormConstants.deleteButtonText,
  cancelText = FormConstants.cancelButtonText,
}: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered radius={15}>
      <Text>{message}</Text>
      <Group justify="right" mt="md">
        <Button variant="outline" color="cyan" radius={7} onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          color="pink"
          variant="outline"
          radius={7}
          leftSection={<Image src={trash} />}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </Group>
    </Modal>
  );
}

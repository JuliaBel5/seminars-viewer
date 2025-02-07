import { Modal, Text, Button, Group } from "@mantine/core";

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
  title = "Подтверждение",
  message = "Вы уверены, что хотите выполнить это действие?",
  confirmText = "Удалить",
  cancelText = "Отмена",
}: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Text>{message}</Text>
      <Group justify="right" mt="md">
        <Button variant="default" onClick={onClose}>
          {cancelText}
        </Button>
        <Button color="red" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Group>
    </Modal>
  );
}

import { Modal, TextInput, Button, Group, Textarea } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { Seminar } from "../types/seminarType";

interface EditSeminarModalProps {
  opened: boolean;
  onClose: () => void;
  seminar: Seminar | null;
  onSave: (updatedSeminar: Seminar) => void;
}

export function EditSeminarModal({
  opened,
  onClose,
  seminar,
  onSave,
}: EditSeminarModalProps) {
  const form = useForm<{
    id: string;
    title: string;
    description: string;
    date: Date | null;
    time: string;
    photo: string;
  }>({
    initialValues: {
      id: "",
      title: "",
      description: "",
      date: null,
      time: "",
      photo: "",
    },
  });

  useEffect(() => {
    if (seminar) {
      form.setValues({
        ...seminar,
        date: seminar.date ? new Date(seminar.date) : null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seminar]);

  const handleSave = () => {
    onSave({
      ...form.values,
      date: form.values.date ? form.values.date.toISOString() : "",
    });
    onClose();
  };

  return (
    <Modal.Root
      opened={opened}
      closeOnClickOutside={true}
      onClose={onClose}
      size="1080px"
      centered
    >
      <Modal.Overlay />
      <Modal.Content pb={10} radius={15}>
        <Modal.Header>
          <Modal.Title px={8}>Редактирование семинара</Modal.Title>
        </Modal.Header>

        <Modal.Body className="system-modal-body">
          <TextInput label="Название" {...form.getInputProps("title")} />
          <Textarea label="Описание" {...form.getInputProps("description")} />
          <DatePickerInput
            clearable
            valueFormat="DD/MM/YYYY"
            defaultValue={new Date()}
            label="Дата"
            value={form.values.date}
            onChange={(value) => form.setFieldValue("date", value)}
          />
          <TimeInput label="Время" {...form.getInputProps("time")} />
          <TextInput label="Ссылка на фото" {...form.getInputProps("photo")} />

          <Group justify="right" mt="md">
            <Button color="pink" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button color="cyan" radius={7} onClick={handleSave}>
              Сохранить
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

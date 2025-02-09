import { Modal, TextInput, Button, Group, Textarea } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import dayjs from "dayjs";
import { Seminar } from "../../types/seminarType";
import { FormConstants } from "../../utils/constants";

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
    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Введите название"),
      description: (value) =>
        value.trim().length > 0 ? null : "Введите описание",
      date: (value) => (value ? null : "Выберите дату"),
      time: (value) => (value.trim().length > 0 ? null : "Введите время"),
      photo: (value) =>
        value.trim().length > 0 ? null : "Введите ссылку на фото",
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
    if (!form.isValid()) return;
    onSave({
      ...form.values,
      date: form.values.date
        ? dayjs(form.values.date).format("DD.MM.YYYY")
        : "",
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
          <Modal.Title px={8}>{FormConstants.editModalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="system-modal-body">
          <TextInput
            required
            label="Название"
            {...form.getInputProps("title")}
            error={form.errors.title}
          />
          <Textarea
            required
            label="Описание"
            {...form.getInputProps("description")}
            error={form.errors.description}
          />
          <DatePickerInput
            required
            clearable
            valueFormat="DD/MM/YYYY"
            defaultValue={new Date()}
            label="Дата"
            value={form.values.date}
            onChange={(value) => form.setFieldValue("date", value)}
            error={form.errors.date}
          />
          <TimeInput
            required
            label="Время"
            {...form.getInputProps("time")}
            error={form.errors.time}
          />
          <TextInput
            required
            label="Ссылка на фото"
            {...form.getInputProps("photo")}
            error={form.errors.photo}
          />

          <Group justify="right" mt="md">
            <Button color="pink" variant="outline" radius={7} onClick={onClose}>
              {FormConstants.cancelButtonText}
            </Button>
            <Button
              color="cyan"
              radius={7}
              onClick={handleSave}
              disabled={!form.isValid()}
            >
              {FormConstants.saveButtonMessage}
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

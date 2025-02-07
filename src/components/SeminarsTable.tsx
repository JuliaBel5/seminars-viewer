import { Table, Button, Image, Box } from "@mantine/core";
import { Seminar } from "../types/seminarType";

interface SeminarsTableProps {
  seminars: Seminar[];
  onDelete: (id: string) => void;
  onEdit: (seminar: Seminar) => void;
}

export function SeminarsTable({
  seminars,
  onDelete,
  onEdit,
}: SeminarsTableProps) {
  return (
    <Table highlightOnHover className="main-table">
      <thead>
        <tr>
          <th>Фото</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Дата</th>
          <th>Время</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {seminars.map((seminar) => (
          <tr key={seminar.id}>
            <td>
              <Image
                src={seminar.photo}
                alt={seminar.title}
                width={80}
                height={50}
                mx={"5px"}
                radius="sm"
              />
            </td>
            <td>{seminar.title}</td>
            <td>{seminar.description}</td>
            <td>{(seminar.date as string) || ""}</td>
            <td>{seminar.time}</td>
            <td>
              <Box display={"flex"}>
                <Button
                  variant="outline"
                  color="cyan"
                  size="xs"
                  m="xs"
                  radius={7}
                  onClick={() => onEdit(seminar)}
                >
                  Редактировать
                </Button>
                <Button
                  radius={7}
                  m="xs"
                  variant="outline"
                  color="pink"
                  size="xs"
                  onClick={() => onDelete(seminar.id)}
                >
                  Удалить
                </Button>
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

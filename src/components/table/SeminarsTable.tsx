import { Table, Button, Image, Box } from "@mantine/core";
import { Seminar } from "../../types/seminarType";
import { tableHeaders } from "./tableHeaders";
import { FormConstants } from "../../utils/constants";
import { useMediaQuery } from "@mantine/hooks";

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
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Table striped highlightOnHover className="main-table">
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {seminars.map((seminar) => (
          <tr key={seminar.id} style={{ borderBottom: "1px solid #dee2e6" }}>
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
              <Box display="flex">
                <Button
                  variant="outline"
                  color="cyan"
                  size="xs"
                  m="xs"
                  radius={7}
                  onClick={() => onEdit(seminar)}
                  className={isMobile ? "table-edit-button" : ""}
                >
                  {isMobile ? "" : FormConstants.editButtonText}
                </Button>
                <Button
                  variant="outline"
                  radius={7}
                  m="xs"
                  color="pink"
                  size="xs"
                  className={isMobile ? "table-delete-button" : ""}
                  onClick={() => onDelete(seminar.id)}
                >
                  {isMobile ? "" : FormConstants.deleteButtonText}
                </Button>
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

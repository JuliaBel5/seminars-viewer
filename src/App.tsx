import { useState } from "react";
import { useSeminars } from "./hooks/useSeminars";
import { Container, Title, Loader, Box } from "@mantine/core";
import { SeminarsTable } from "./components/SeminarsTable";
import { EditSeminarModal } from "./components/EditSeminarModal";
import { ConfirmModal } from "./components/ConfirmModal";
import { Seminar } from "./types/seminarType";
import { toast } from "react-toastify";

function App() {
  const { seminars, loading, error, deleteSeminar, updateSeminar } =
    useSeminars();
  const [selectedSeminar, setSelectedSeminar] = useState<string | null>(null);
  const [isConfirmModalOpen, setisConfirmModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);

  if (loading)
    return (
      <Box className="wrapper">
        <Loader color={"cyan"} mt={"10%"} size={80} />{" "}
      </Box>
    );
  if (error) toast.error("Ошибка загрузки данных");

  return (
    <>
      {isEditModalOpen && (
        <EditSeminarModal
          opened={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          seminar={editingSeminar}
          onSave={(updatedSeminar: Seminar) => updateSeminar(updatedSeminar)}
        />
      )}
      <Container size="lg" py="xl" className="container">
        <Title order={1} mb="lg" c={"#707f7a"}>
          Семинары
        </Title>

        <SeminarsTable
          seminars={seminars}
          onDelete={(id) => {
            setSelectedSeminar(id);
            setisConfirmModalOpen(true);
          }}
          onEdit={(seminar) => {
            setEditingSeminar(seminar);
            setIsEditModalOpen(true);
          }}
        />
        {isConfirmModalOpen && (
          <ConfirmModal
            opened={isConfirmModalOpen}
            onClose={() => setisConfirmModalOpen(false)}
            onConfirm={() => {
              if (selectedSeminar !== null) {
                deleteSeminar(selectedSeminar);
              }
              setisConfirmModalOpen(false);
            }}
            title="Удаление семинара"
            message="Вы уверены, что хотите удалить этот семинар?"
            confirmText="Удалить"
            cancelText="Отмена"
          />
        )}
      </Container>
    </>
  );
}

export default App;

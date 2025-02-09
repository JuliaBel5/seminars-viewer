import { useState } from "react";
import { useSeminars } from "./hooks/useSeminars";
import { Container, Title, Loader, Box } from "@mantine/core";
import { SeminarsTable } from "./components/table/SeminarsTable";
import { ConfirmModal } from "./components/modals/ConfirmModal";
import { Seminar } from "./types/seminarType";
import { toast } from "react-toastify";
import { EditSeminarModal } from "./components/modals/EditSeminarModal";
import { ErrorMessages, FormConstants } from "./utils/constants";

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
  if (error) toast.error(ErrorMessages.uploadError);

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
      <Container py="xl" className="container">
        <Title order={1} mb="lg" c={"#707f7a"}>
          {FormConstants.mainTitle}
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
          />
        )}
      </Container>
    </>
  );
}

export default App;

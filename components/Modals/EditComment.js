import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

function EditComment() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit your comment."
      >
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}

export default EditComment;
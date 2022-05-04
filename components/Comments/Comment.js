import { useState } from "react";
import {
  createStyles,
  Text,
  Avatar,
  Group,
  Paper,
  ActionIcon,
  Modal,
  Textarea,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Edit, Trash } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

export function Comment({ comment, setComments }) {
  const { _id, postedAt, body, author } = comment;
  const [ modalOpened, setModalOpened ] = useState(false);
  const [ deleted, setDeleted ] = useState(false);
  const { classes } = useStyles();

  const deleteComment = async () => {
    const response = await fetch(`/api/comment/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    });
    const responseJson = await response.json();
    setDeleted(true);
    console.log(responseJson);
  };

  const form = useForm({
    initialValues: {
      editComment: "test",
    },
  });

  const onUpdateComment = async (value) => {
    const response = await fetch("/api/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        body: value.editComment,
      }),
    });

    const responseJson = await response.json();

    setComments((comments) => comments.map((comment) => {
        if(comment._id === _id) {
          return {
            ...comment,
            body: value.editComment,
          };
        }
        
        return comment;
      }));
    
    form.reset();
    setModalOpened(false);
  };

  const editComment = () => {
    form.setFieldValue('editComment', body);
    setModalOpened(true);
  }

  return (
    <>
      {!deleted && (
        <>
          <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Edit your comment."
          >
            <form onSubmit={form.onSubmit((value) => onUpdateComment(value))}>
              <Textarea
                required
                data-autofocus
                placeholder="What's on your mind?"
                variant="filled"
                className={classes.media}
                value={form.values.editComment}
                onChange={(event) => form.setFieldValue(event.currentTarget.value)}
                {...form.getInputProps("editComment")}
              />
              <Group position={"right"} mt={20}>
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Modal>
          <Paper withBorder radius="md" className={classes.comment}>
            <Group>
              <Avatar src={author.image} alt={author.name} radius="xl" />
              <div>
                <Text size="sm">{author.name}</Text>
                <Text size="xs" color="dimmed">
                  {new Date(postedAt).toLocaleString()}
                </Text>
              </div>
            </Group>
            <Text className={classes.body} size="sm">
              <Group position="apart">
                {body}
                <Group>
                  <ActionIcon
                    onClick={() => editComment()}
                    size="lg"
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      color:
                        theme.colorScheme === "dark"
                          ? theme.colors.green[4]
                          : theme.colors.green[6],
                    })}
                  >
                    <Edit size={18} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => deleteComment()}
                    size="lg"
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      color:
                        theme.colorScheme === "dark"
                          ? theme.colors.red[4]
                          : theme.colors.red[6],
                    })}
                  >
                    <Trash size={18} />
                  </ActionIcon>
                </Group>
              </Group>
            </Text>
          </Paper>
        </>
      )}
    </>
  );
}

import { useState } from "react";
import {
  createStyles,
  Text,
  Avatar,
  Group,
  Card,
  ActionIcon,
  Modal,
  Menu,
  Textarea,
  Button,
} from "@mantine/core";
import { Edit, Trash, Heart, Share, BrandTwitter, Check } from "tabler-icons-react";
import { showNotification } from '@mantine/notifications';
import { useForm } from "@mantine/form";

const tweetUrl = "https://twitter.com/intent/tweet?url=https%3A%2F%2Fsocialbutterfly.vercel.app%2F&text=Check%20out%20this%20cool%20social%20media%20Jamstack%20app%20I%20made%20using%20the%20@MongoDB%20Data%20API%2C%20@Vercel%20serverless%20functions%2C%20@GitHub%2C%20and%20@Auth0%20for%20user%20authentication%21%21%21";

const useStyles = createStyles((theme) => ({
  flutter: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    marginBottom: theme.spacing.sm,
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

  liked: {
    fill: theme.colors.red[6],
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

const Flutter = ({ flutter, setFlutters }) => {
  const { _id, postedAt, body, user: flutterUser } = flutter;
  const [modalOpened, setModalOpened] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const { classes, theme } = useStyles();

  const form = useForm({
    initialValues: {
      editFlutter: "",
    },
  });

  const editFlutter = () => {
    form.setFieldValue("editFlutter", body);
    setModalOpened(true);
  };

  const onUpdateFlutter = async (value) => {
    setInputDisabled(true);
    const response = await fetch("/api/flutter", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        body: value.editFlutter,
      }),
    });

    const responseJson = await response.json();

    console.log(responseJson);

    setFlutters((flutters) =>
      flutters.map((flutter) => {
        if (flutter._id === _id) {
          return {
            ...flutter,
            body: value.editFlutter,
          };
        }

        return flutter;
      })
    );

    form.reset();
    setInputDisabled(false);
    setModalOpened(false);
    showSuccess('Your flutter has been updated');
  };

  const deleteFlutter = async () => {
    const response = await fetch(`/api/flutter/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson); 
    setDeleted(true);
  };

  const showSuccess = (message) => {
    showNotification({
      title: "Success",
      message,
      icon: <Check size={18} />,
      autoClose: 5000,
      styles: (theme) => ({
        root: {
          borderColor: theme.colors.green[6],
        }
      }),
    });
  };

  return (
    <>
      {!deleted && (
        <>
          <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Edit your flutter."
          >
            <form onSubmit={form.onSubmit((value) => onUpdateFlutter(value))}>
              <Textarea
                required
                data-autofocus
                placeholder="Edit your flutter."
                variant="filled"
                className={classes.media}
                {...form.getInputProps("editFlutter")}
              />
              <Group position={"right"} mt={20}>
                <Button type="submit" disabled={inputDisabled}>Update</Button>
              </Group>
            </form>
          </Modal>
          <Card withBorder radius="md" className={classes.flutter}>
            <Group>
              <Avatar
                src={flutterUser.picture}
                alt={flutterUser.name}
                radius="xl"
              />
              <div>
                <Text size="sm">{flutterUser.nickname}</Text>
                <Text size="xs" color="dimmed">
                  {new Date(postedAt).toLocaleString()}
                </Text>
              </div>
            </Group>
            <Text className={classes.body} size="sm">
              {body}
            </Text>
            <Card.Section className={classes.footer}>
              <Group position="apart">
                <Text size="xs" color="dimmed">
                  0 people liked this
                </Text>
                <Group spacing={0}>
                  <ActionIcon
                    size="lg"
                  >
                    <Heart size={18} color={theme.colors.red[6]} />
                  </ActionIcon>
                  <Menu
                    control={
                      <ActionIcon size="lg">
                        <Share size={16} color={theme.colors.blue[6]} />
                      </ActionIcon>
                    }
                    transition="fade"
                    position="bottom"
                    placement="start"
                    size="lg"
                  >
                    <Menu.Item
                      icon={
                        <BrandTwitter size={16} color={theme.colors.blue[4]} />
                      }
                      component="a"
                      href={tweetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </Menu.Item>
                  </Menu>
                  <ActionIcon
                    onClick={() => editFlutter()}
                    size="lg"
                    sx={(theme) => ({
                      color:
                        theme.colorScheme === "dark"
                          ? theme.colors.green[4]
                          : theme.colors.green[6],
                    })}
                  >
                    <Edit size={18} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => deleteFlutter()}
                    size="lg"
                    sx={(theme) => ({
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
            </Card.Section>
          </Card>
        </>
      )}
    </>
  );
};

export default Flutter;

import {
  UnstyledButton,
  Group,
  Avatar,
  Menu,
  Text,
  createStyles,
} from "@mantine/core";
import { ChevronRight, Logout } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

const demoUser = {
  id: "6276d0c602ce122f7b8b11ec",
  name: "Jesse Hall",
  nickname: "codestackr",
  picture:
    "https://lh3.googleusercontent.com/a-/AOh14GgPdA54bhnYcSngbZxMuSLe-khjk-BaaKWsvmxD=s96-c",
};

const UserButton = () => {
  const user = demoUser;
  const { classes, theme } = useStyles();
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];

  return (
    <Menu
      control={
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar src={user.picture} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {user.nickname}
              </Text>

              <Text color="dimmed" size="xs">
                {user.email}
              </Text>
            </div>

            <ChevronRight size={14} />
          </Group>
        </UnstyledButton>
      }
      transition="fade"
      trigger="hover"
      position="right"
      placement="end"
      size="lg"
    >
      <Menu.Item
        icon={<Logout size={16} color={menuIconColor} />}
        component="a"
      >
        Logout
      </Menu.Item>
    </Menu>
  );
}

export default UserButton;

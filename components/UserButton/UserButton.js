import { useUser } from "../../context/UserContext";
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

const UserButton = ({ ...others }) => {
  const user = useUser();
  const { classes, theme } = useStyles();
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];

  return (
    <Menu
      control={
        <UnstyledButton className={classes.user} {...others}>
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
        href="/api/auth/logout"
      >
        Logout
      </Menu.Item>
    </Menu>
  );
}

export default UserButton;

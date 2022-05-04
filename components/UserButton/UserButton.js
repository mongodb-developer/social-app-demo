import React from 'react';
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
} from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

export function UserButton({ image, name, email, icon, ...others }) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <ChevronRight size={14} />}
      </Group>
    </UnstyledButton>
  );
}
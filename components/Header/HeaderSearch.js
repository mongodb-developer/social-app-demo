import { useState } from "react";
import {
  createStyles,
  Header,
  TextInput,
  Group,
} from "@mantine/core";
import ColorToggle from "../ColorToggle/ColorToggle";
import { Search } from "tabler-icons-react";
import { Logo } from "./Logo";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "0.5rem",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

const HeaderSearch = ({ setFlutters }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { classes } = useStyles();

  const handleSearch = async (e) => {
    const term = e.currentTarget.value;
    setSearchTerm(e.currentTarget.value);

    if(term.length > 2 || term.length === 0) {
      const getFlutters = await fetch(`/api/flutter/${term}`)
      const getFluttersJson = await getFlutters.json();
      setFlutters(getFluttersJson);
    }
  };

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Logo width={240} />
        <Group>
          <TextInput
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
            className={classes.search}
            placeholder="Search"
            icon={<Search size={16} />}
          />
          <ColorToggle />
        </Group>
      </div>
    </Header>
  );
}

export default HeaderSearch;

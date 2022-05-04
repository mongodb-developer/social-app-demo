import { useState, useEffect } from "react";
import { AppShell } from "@mantine/core";
import NavbarMain from "../components/NavbarMain/NavbarMain";
import Comments from "../components/Comments/Comments";
import CreateComment from "../components/CreateComment/CreateComment";
import { HeaderSearch } from "../components/Header/HeaderSearch";

const comment = {
  _id: "1",
  postedAt: "10 minutes ago",
  body: "This Pokémon likes to lick its palms that are sweetened by being soaked in honey. Teddiursa concocts its own honey by blending fruits and pollen collected by Beedrill. Blastoise has water spouts that protrude from its shell. The water spouts are very accurate.",
  author: {
    name: "Jane Doe",
    image:
      "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
  },
};
const user = {
  author: {
    _id: "1",
    name: "Jane Doe",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  },
};

export default function Home() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/comment")
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  return (
    <AppShell
      header={<HeaderSearch />}
      navbar={<NavbarMain />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <CreateComment {...user} setComments={setComments} />
      <Comments comments={comments} setComments={setComments} />
    </AppShell>
  );
}

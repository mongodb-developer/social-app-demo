import { useState, useEffect } from "react";
import { AppShell, LoadingOverlay } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import Flutters from "../components/Flutters/Flutters";
import CreateFlutter from "../components/Flutters/CreateFlutter";
import HeaderSearch from "../components/Header/HeaderSearch";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [flutters, setFlutters] = useState([]);
  const [page, setPage] = useState("Home");

  useEffect(() => {
    (async () => {
      const getFlutters = await fetch("/api/flutter");
      const getFluttersJson = await getFlutters.json();
      setFlutters(getFluttersJson);

      setIsLoading(false);
    })();
  }, []);

  return (
    <AppShell
      header={<HeaderSearch />}
      navbar={<Navbar page={page} setPage={setPage} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <LoadingOverlay visible={isLoading} />
      <CreateFlutter setFlutters={setFlutters} />
      <Flutters flutters={flutters} setFlutters={setFlutters} />
    </AppShell>
  );
}

import { useState } from "react";
import { useUser, useSetUser } from "../../context/UserContext";
import { Group, Button, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Check } from "tabler-icons-react";

const Profile = () => {
  const user = useUser();
  const setUser = useSetUser();
  const form = useForm({
    initialValues: {
      preferredName: user.nickname,
      picture: user.picture,
    },
  });
  const [dirty, setDirty] = useState(false);

  const onUpdateProfile = async (value) => {
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: user._id,
        nickname: value.preferredName,
        picture: value.picture,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);

    setUser({
      ...user,
      nickname: value.preferredName,
      picture: value.picture,
    });

    setDirty(false);

    showSuccess();
  };

  const showSuccess = () => {
    showNotification({
      title: "Success",
      message: "Your profile has been updated",
      icon: <Check size={18} />,
      autoClose: 5000,
      styles: (theme) => ({
        root: {
          borderColor: theme.colors.green[6],
        },
      }),
    });
  };

  return (
    <>
      <h1>Profile</h1>
      <form
        onSubmit={form.onSubmit((value) => onUpdateProfile(value))}
        onChange={() => setDirty(true)}
      >
        <TextInput
          required
          label="Display Name"
          placeholder="What would you like to be called?"
          variant="filled"
          {...form.getInputProps("preferredName")}
        />
        <TextInput
          required
          label="Avatar Image URL"
          placeholder="Personalize your avatar image."
          variant="filled"
          {...form.getInputProps("picture")}
        />
        <Group position={"apart"} mt={20}>
          {dirty ? <Button type="submit">Save</Button> : <div></div>}
          <Button component="a" href="/api/auth/logout" color="red">
            Logout
          </Button>
        </Group>
      </form>
    </>
  );
};

export default Profile;

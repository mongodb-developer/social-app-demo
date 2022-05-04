import { createStyles, Avatar, Group, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },
  createComment: {
    justifyContent: "center",
  },
  media: {
    width: "50vw",
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "25vw",
    },
  },
}));

const CreateComment = ({ author, setComments }) => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      comment: "",
    },
  });

  const onSubmitComment = async (value) => {
    const comment = {
      postedAt: Date.now(),
      body: value.comment,
      likes: [],
      author,
    };
    const response = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    const responseJson = await response.json();
    
    setComments((comments) => [
      ...comments,
      {
        _id: responseJson.insertedId,
        ...comment
      },
    ]);
    form.reset();
  };

  return (
    <Group position={"center"} mt={10} mb={20}>
      <Avatar src={author.image} alt={author.name} radius="xl" />
      <form onSubmit={form.onSubmit((value) => onSubmitComment(value))}>
        <Group>
          <Textarea
            required
            placeholder="What's on your mind?"
            variant="filled"
            className={classes.media}
            {...form.getInputProps("comment")}
          />
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Group>
  );
};

export default CreateComment;

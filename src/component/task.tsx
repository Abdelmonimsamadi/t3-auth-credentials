// import { type NextPage } from "next";
import { type FormEventHandler, useState } from "react";
import { trpc } from "../utils/trpc";

interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

const Task = ({ todo }: { todo: Todo }) => {
  const util = trpc.useContext();
  const [input, setInput] = useState(todo.task);
  const [isEditing, setIsEditing] = useState(false);
  const deleteTask = trpc.todo.delete.useMutation({
    onSuccess() {
      util.todo.invalidate();
    },
  });
  const updateTask = trpc.todo.update.useMutation({
    async onSuccess() {
      await util.todo.invalidate();
      setIsEditing(false);
    },
  });

  const handleUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await updateTask.mutateAsync({ id: todo.id, todo: { task: input } });
  };

  const handleCheckbox = async (bool: boolean) => {
    await updateTask.mutateAsync({
      id: todo.id,
      todo: { completed: bool },
    });
  };

  const handleDelete = async () => {
    await deleteTask.mutateAsync({ id: todo.id });
  };
  return (
    <li className="relative flex items-center justify-between border-b px-2 py-6">
      <div>
        <input
          type="checkbox"
          onChange={(e) => handleCheckbox(e.currentTarget.checked)}
          className="mr-2"
          checked={todo.completed}
          //   onClick={handleCheckbox}
        />
        {isEditing ? (
          <form onSubmit={handleUpdate} className="inline-block">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border-grey-600 w-full rounded border px-2 py-1 outline-none"
            />
          </form>
        ) : (
          <p
            className={`inline-block text-gray-600 ${
              todo.completed && "line-through"
            }`}
          >
            {todo.task}
          </p>
        )}
      </div>
      <div className="absolute right-0 flex items-center space-x-2">
        <button onClick={() => setIsEditing(!isEditing)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default Task;

import { useState } from "react";
import { addTodo, getTodos } from "./api/todo";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function Todo() {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const {
    isPending,
    error,
    data: todos,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const mutation = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (old: Todo[]) => [
        ...old,
        { ...newTodo, id: 2000 },
      ]);
      return { previousTodos };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }

  return (
    <>
      <div>
        <Link to="/">Home Page </Link>
      </div>

      <div>
        <input
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          className="border m-4 p-4 border-blue-500 h-10 w-96"
          type="text"
          placeholder="new Todo"
        />
        <button
          type="button"
          onClick={async () => {
            console.log("inside add", newTodo);
            setNewTodo("");
            mutation.mutate({ content: newTodo });
          }}
        >
          Add
        </button>
      </div>
      <div className="">
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="border-b p-4">
              {todo.content}
              <span className="bg-red-300 p-2">{todo.id}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Todo;

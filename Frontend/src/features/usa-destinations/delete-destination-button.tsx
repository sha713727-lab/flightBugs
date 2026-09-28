"use client";

import { deleteDestinationAction } from "@/server/actions/admin-destinations";

type DeleteDestinationButtonProps = {
  readonly id: string;
  readonly name: string;
};

export function DeleteDestinationButton({
  id,
  name,
}: DeleteDestinationButtonProps) {
  return (
    <form
      action={deleteDestinationAction}
      onSubmit={(event) => {
        if (
          !window.confirm(
            `Delete ${name}? This cannot be undone.`,
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="font-medium text-red-700"
      >
        Delete
      </button>
    </form>
  );
}

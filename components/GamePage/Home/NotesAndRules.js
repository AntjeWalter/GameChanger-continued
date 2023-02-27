import Notes from "./Notes";
import Rules from "./Rules";

export default function NotesAndRules({
  onAddNotes,
  onAddRules,
  gameId,
  notes,
  rules,
}) {
  return (
    <>
      <Rules onAddRules={onAddRules} rules={rules} gameId={gameId} />
      <hr />
      <Notes gameId={gameId} onAddNotes={onAddNotes} notes={notes} />
    </>
  );
}

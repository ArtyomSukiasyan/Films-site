import General from "./General";

export default function LogOut() {
  localStorage.removeItem("currentUser");

  return (
    <>
      <General />
    </>
  );
}
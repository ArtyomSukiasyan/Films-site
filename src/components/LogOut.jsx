export default function LogOut() {
  localStorage.removeItem("currentUser");
  window.location = "/";
  return null;
}

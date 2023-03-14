import { useSession, signIn, signOut } from "next-auth/react";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import styled from "styled-components";

export default function Login() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <button onClick={signOut} aria-label="Ausloggen">
          <FiLogOut size="20px" />
        </button>
      ) : (
        <>
          <button onClick={() => signIn()} aria-label="Einloggen">
            <FiLogIn /> Einloggen
          </button>
        </>
      )}
    </>
  );
}

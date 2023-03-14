import { useSession, signIn, signOut } from "next-auth/react";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import styled from "styled-components";

export default function Login() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <StyledLogout>
            Logout
            <StyledLogoutButton onClick={signOut} aria-label="Ausloggen">
              <FiLogOut size="15px" />
            </StyledLogoutButton>
          </StyledLogout>
        </>
      ) : (
        <>
          <h1>GameChanger 🎲</h1>
          <StyledLoginButton onClick={() => signIn()} aria-label="Einloggen">
            <FiLogIn size="20px" /> Einloggen
          </StyledLoginButton>
        </>
      )}
    </>
  );
}

const StyledLogout = styled.section`
  text-align: right;
  font-size: 0.8rem;
`;

const StyledLogoutButton = styled.button`
  background-color: transparent;
  border-radius: 3px;
  margin-left: 5px;
  padding-top: 3px;
`;

const StyledLoginButton = styled.button`
  margin-top: 30px;
  font-size: 1.2rem;
  background-color: transparent;
  border-radius: 3px;
  padding-top: 3px;
`;

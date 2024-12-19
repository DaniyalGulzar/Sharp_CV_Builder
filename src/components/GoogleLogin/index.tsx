import { FC, ReactNode } from "react";
import Button from "../Button";

interface GoogleSignInButtonProps {
  children: ReactNode;
  signInWithGoogle: any;
  iconSrc: string;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
  children,
  signInWithGoogle,
  iconSrc,
}) => {
  const loginWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <Button
      onClick={loginWithGoogle}
      type="button"
      className="w-full h-[60px] bg-transparent border-989898 text-555370 border px-6 py-3 rounded-lg"
      iconSrc={iconSrc}
      iconSize={24}
    >
      {children}
    </Button>
  );
};

export default GoogleSignInButton;

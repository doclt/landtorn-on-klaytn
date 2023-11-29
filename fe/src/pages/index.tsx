import { useRouter } from "next/router";

export default function Landing() {
  const {push} = useRouter();
  push('/lorak')
  return null;
}

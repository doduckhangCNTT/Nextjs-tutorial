import { useRouter } from "next/router";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  href: string;
}

const ActiveLink: React.FC<IProps> = ({ children, href }) => {
  const router = useRouter();
  console.log("Router: ", router);
  const style = {
    marginRight: 10,
    // asPath lấy tất cả chuỗi sau https://localhost3000
    color: router.asPath.includes(href) ? "red" : "blue",
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};

export default ActiveLink;

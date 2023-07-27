import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiSecurePaymentLine, RiWhatsappLine, RiMailLine} from "react-icons/ri";
import { BsCreditCard2Back, BsClock, BsFillSuitHeartFill, BsGithub } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Footer = () => {
  const members = [
    { name: "Matias Mariotti", github: "https://github.com/mmariotti08" },
    { name: "Brayan Anacona", github: "https://github.com/brayan4nacona" },
    { name: "Mauricio Rubilar", github: "https://github.com/MRubilarRiffo" },
    { name: "Maryeris Orozco", github: "https://github.com/Marye05" },
    { name: "José Orellana", github: "https://github.com/joseaot" },
    { name: "Luis Sánchez", github: "https://github.com/luissanchez92" },
    { name: "José Centeno", github: "https://github.com/JoseMcmW" },
    { name: "Nicolás Moreno", github: "https://github.com/JNicolasmm" },
  ];

  const elements = [
    {
      title: "Fast Shipping",
      text: "Receive in 2 to 5 business days throughout Argentina",
      icon: LiaShippingFastSolid,
    },
    {
      title: "Secure Payment",
      text: "We rely on Mercado Pago, one of the safest payment processors",
      icon: RiSecurePaymentLine,
    },
    {
      title: "24/7 Support",
      text: "Contact us 24 hours a day, 7 days a week",
      icon: BsClock,
    },
    {
      title: "Flexible Payments",
      text: "Pay in up to 6 interest-free installments",
      icon: BsCreditCard2Back,
    },
  ];

  const useful_links = [
    {
      title: "About Us",
      text: "We are a modern and exclusive brand of sneakers and fashion items.",
      helps: [
        {
          to: "https://wa.me/56999999999",
          title: "+56 9 9999 9999",
          icon: RiWhatsappLine,
        },
        {
          to: "mailto:info@shopconnect.com",
          title: "info@shopconnect.com",
          icon: RiMailLine,
        },
      ],
    },
    {
      title: "Useful Links",
      helps: [
        { to: "/aboutUs", title: "About Us" },
        { to: "/fQuestions", title: "Frequent Questions" },
        { to: "/measureSize", title: "How to measure your size?" },
      ],
    },
  ];

  const [membersOn, setMembersOn] = useState(false);

  const handleClick = () => {
    setMembersOn(!membersOn);
  };

  return (
    <div className={styles.todo}>
      <div id={styles.container_elements}>
        {elements.map((element, index) => (
          <div key={`${index}-${element}`} className={styles.div_elements}>
            <div className={styles.ico}>
              <element.icon />
            </div>
            <div className={styles.text}>
              <h3>{element.title}</h3>
              <span>{element.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div id={styles.useful_links}>
        {useful_links.map((c, index) => (
          <div key={`${index}-${c}`} className={styles.useful_links_div}>
            <h3>{c.title}</h3>
            {c.text && <h4>{c.text}</h4>}
            <div className={styles.container_links}>
              {c.helps.map((help, index) => (
                <Link key={`${index}-${help}`} to={help.to}>
                  {help.icon && <help.icon />}
                  <span>{help.title}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.derechos}>
        <p>© SHOPCONNECT - 2023</p>
        <p id={styles.made_whith} onClick={handleClick}>
          Made with <BsFillSuitHeartFill /> group 16
        </p>
      </div>

      {membersOn && (
        <div className={styles.container_members}>
          <button onClick={handleClick}>
            <AiOutlineClose />
          </button>
          <h3>Members</h3>
          <div className={styles.members}>
            {members.map((member, index) => (
              <div key={`${index}-${member}`}>
                <a href={member.github} target="_blank">
                  <BsGithub />
                  <span>{member.name}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      <div id={styles.scroll_buttom}>
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export { Footer };

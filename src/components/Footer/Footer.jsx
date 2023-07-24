import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import { LiaShippingFastSolid } from 'react-icons/lia';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { BsCreditCard2Back, BsClock } from 'react-icons/bs';

const Footer = () => {
	const members = [
		{ name: "Matias Mariotti", github: "https://github.com/mmariotti08" },
		{ name: "Brayan Anacona", github: "https://github.com/brayan4nacona" },
		{ name: "Mauricio Rubilar", github: "https://github.com/MRubilarRiffo" },
		{ name: "Maryeris Orozco", github: "https://github.com/Marye05" },
		{ name: "José Orellana", github: "https://github.com/joseaot" },
		{ name: "Luis Sánchez", github: "https://github.com/luissanchez92" },
		{ name: "José Centeno", github: "https://github.com/JoseMcmW" },
		{ name: "Nicolás Moreno", github: "https://github.com/JNicolasmm" }
	];

	const helps = [
		{ to: "/aboutUs", title: "About Us" },
		{ to: "/fQuestions", title: "Frecuent Questions" },
		{ to: "/measureSize", title: "How to measure your size?" }
	];

	const elements = [
		{ title: "Fast Shipping", text: "Receive in 2 to 5 business days throughout Argentina", icon: LiaShippingFastSolid },
		{ title: "Secure Payment", text: "We rely on Mercado Pago, one of the safest payment processors", icon: RiSecurePaymentLine },
		{ title: "24/7 Support", text: "Contact us 24 hours a day, 7 days a week", icon: BsClock },
		{ title: "Flexible Payments", text: "Pay in up to 6 interest-free installments", icon: BsCreditCard2Back }
	];	

	return (
		<div className={styles.todo}>
			<div id={styles.container_elements}>
				{elements.map((element, index) => (
					<div
						key={`${index}-${element}`}
						className={styles.div_elements}
						>
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

			<div className={styles.container}>
				<div className={styles.containerName}>
					<h1>Members</h1>
					<div className={styles.integrantes}>
						{members.map((member, index) => (
							<div key={`${index}-${member}`} className={styles.nombre}>
								<a href={member.github} target="_blank">
									<h3>{member.name}</h3>
								</a>
							</div>
						))}
					</div>
				</div>

				<div className={styles.help}>
					{helps.map((help, index) => (
						<Link key={`${index}-${help}`} to={help.to} >
							<h3>{help.title}</h3>
						</Link>
					))}
				</div>

				<div>
					<ScrollToTopButton />
				</div>
			</div>
			<div className={styles.derechos}>
				<p>© ShopConnect - 2023</p>
			</div>
		</div>
	);
};


export { Footer };

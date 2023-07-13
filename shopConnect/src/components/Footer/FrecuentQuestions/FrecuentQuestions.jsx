import styles from "./FrecuentQuestions.module.css";

const FrecuentQuestions = () => {
   window.scrollTo(0, 0);
  return (
    <div className={styles.container}>
      <h1>PAYMENTS</h1>
      <h2>What payment methods are available?</h2>
      <p>
        You can pay for your orders with a Credit Card or through Mercado Pago
        using Payment Coupons.
      </p>
      <br />
      <h2>Is it safe to pay with my credit card on ShopConnect?</h2>
      <p>
        Yes, it is safe. We understand that the security of your personal
        information is of utmost importance to you. We comply with the
        international data protection standard to ensure that your personal and
        credit card information is protected from unauthorized access.
      </p>
      <br />
      <h2>How do I know if my payment has been credited?</h2>
      <p>
        Once your payment has been successfully credited by administration, you
        will receive an email informing you of the accreditation number and the
        corresponding invoice number.
      </p>
      <br />

      <h1>SHIPPING AND PICKUP</h1>
      <h2>What are the shipping methods?</h2>
      <p>Home delivery: Deliveries to any point in the country</p>
      <p>
        Same-day Express Delivery: valid for business days. It is a premium
        service. Valid for purchases made with a credit card.
      </p>
      <p>Store Pickup</p>
      <br />
      <h2>How long does it take for my order to arrive?</h2>
      <p>
        The delivery time depends on the product availability, shipping time,
        and payment method approval. The indicated days are estimates and always
        start counting from the moment the payment is approved.
      </p>
      <br />
      <h2>How are the deliveries made?</h2>
      <p>
        Orders leave our warehouse in tamper-evident bags. Upon receiving your
        purchase, please verify that the packaging has not been tampered with.
        If you notice any issues, do not accept the delivery.
      </p>
      <br />
      <h2>Can someone else receive my order?</h2>
      <p>
        Any person over 18 years old present at the agreed-upon address can
        receive the order by presenting identification.
      </p>
      <br />
      <h2>What do I need to pick up my order from a store?</h2>
      <p>
        Only the cardholder used for the purchase can pick up the order sent to
        one of our stores. The following documentation must be presented.
        Otherwise, the order will not be released:
      </p>

      <p> - ID card of the cardholder.</p>

      <p>- Physical card used for the purchase.</p>

      <p>
        After receiving the notification that the order is ready for pickup, you
        have fifteen (15) consecutive days to do so. Once this period has
        elapsed, the company may cancel the order and issue a refund using the
        payment method used for the purchase.
      </p>
      <br />
      <h2>What happens if there is no one to receive my order?</h2>
      <p>
        If there is no one present at the user-specified address during the
        delivery of the order, the carrier will make a new visit. If no one is
        present at the address again, the user can pick it up from the logistics
        branch indicated in the visit notice within a maximum of 5 business days
        from the notification date, or the order will be returned to our
        warehouse.
      </p>
      <br />
      <h2>On which days and at what times are the orders delivered?</h2>
      <p>
        Orders are delivered from Monday to Friday, from 8 am to 12 am. No
        orders are delivered on weekends or holidays.
      </p>
      <br />
      <h1>EXCHANGES AND RETURNS</h1>
      <h2>How much time do I have to make an exchange?</h2>
      <p>
        You have up to 30 (thirty) consecutive days from the receipt of the
        product to make the desired exchange. The purchased product must be in
        the same conditions as received or purchased, in perfect condition, with
        the original label and packaging. To proceed with the exchange, it is
        mandatory to present the printed invoice. In the case of an exchange due
        to a defect, you have 180 (one hundred eighty) consecutive days from the
        receipt of the product to make the corresponding claim.
      </p>
      <br />
      <h2>Is there a cost for making an exchange?</h2>
      <p>The first exchange is free! Both in-store and for home delivery.</p>

      <p>From the second exchange onwards:</p>

      <p>
        {" "}
        • The cost of the exchange (shipping and return) depends on the delivery
        address.
      </p>

      <p> • In-store exchanges remain free! 😉</p>

      <p>
        If the reason for the exchange is receiving a product different from the
        one purchased, it will not have an associated cost.
      </p>

      <br />
      <h2>Are home exchanges available?</h2>
      <p>
        Yes. The first exchange is free. You can choose to make the exchange at
        any of our stores (subject to stock availability) or at your home free
        of charge, or at a cost if the product needs to be sent from another
        store or warehouse.
      </p>
      <br />
      <h2></h2>
    </div>
  );
};

export default FrecuentQuestions;

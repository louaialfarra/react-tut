import { useState } from "react";

const Checkout = () => {
  const [firstname, Setfirstname] = useState("");
  const [lastname, Setlastname] = useState("");
  const [address, SetAddress] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      NAME :
      <input
        type="text"
        value={firstname}
        onChange={(e) => Setfirstname(e.target.value)}
      />
      last name:
      <input
        type="text"
        value={lastname}
        onChange={(e) => Setlastname(e.target.value)}
      />
      Address:
      <input
        type="text"
        value={address}
        onChange={(e) => SetAddress(e.target.value)}
      />
    </div>
  );
};
export default Checkout;

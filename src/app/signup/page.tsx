import Input from "@/components/Input";
import styles from "./signup.module.css";
import Button from "@/components/Button";

export default function Signup() {
  return (
    <main>
      <div className={styles.signup}>
        <div className={styles.presentation}>
          <h1 className={styles.title}>
            Signup,
            <br />
            Bee a BookHiver!
          </h1>
        </div>

        <div className={styles.gridContainer}>
          <Input type="text" id="firstName" label="First name" />
          <Input type="text" id="lastName" label="Last name" />
          <Input type="date" id="date" label="Date of birth" />
          <Input type="text" id="username" label="Username" />
          <Input type="password" id="password" label="Password" />
          <Button className={styles.button}>Join us</Button>
        </div>
      </div>
    </main>
  );
}

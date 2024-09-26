import BookSection from "@/components/BookSection";
import Title from "@/components/Title";

export default function Home() {
  return (
    <main>
      <Title
        titleText="Welcome to Bookhive!"
        subTitleText={"Discover more about book's world"}
      />
      <BookSection></BookSection>
    </main>
  );
}

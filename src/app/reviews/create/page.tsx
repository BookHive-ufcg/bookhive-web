import React from 'react';

import Title from "@/components/Title";
import DateFields from "./DateFields";
import Coments from "./Coments";
import Animation from "./Animation";

export default function CreateReview() {
  return <main>
        <Title titleText="Review" subTitleText="Create the best review" />
        <DateFields></DateFields>
        <Animation></Animation>
        <Coments></Coments>
        <h1>teste</h1>
  </main>;
}

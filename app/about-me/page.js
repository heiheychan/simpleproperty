import React from "react";
import MainLayout from "../components/layouts/mainLayout";

export default function page() {
  return (
    <MainLayout>
      <main className="w-full flex flex-col justify-center items-center pt-48">
        <h4 className="mb-4">About me</h4>
        <p className="text-center">
          Hi, I&apos;m Bill, a Product Manager based in New York. Love
          coding when I am not product managing.{" "}
          <p className="underline text-blue-500 mt-4"><a href="https://www.linkedin.com/in/billcch/" target="_blank">
            Connect with me on Linkedin
          </a></p>
        </p>
      </main>
    </MainLayout>
  );
}

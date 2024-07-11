import Container from "../Container";

function HomePage() {
  return (
    <>
      <Container>
        <div className="h-[90vh] border w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 overflow-y-scroll scroll-mx-14"></div>
      </Container>
    </>
  );
}

export default HomePage;

import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  const content = currentUser ? "You are signed in" : "You are NOT signed in.";
  return <h1>{content}</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);

  const response = await client
    .get("/api/users/currentuser")
    .catch((err) => console.log(err.message));

  return response?.data ? response.data : { currentUser: null };
};

export default LandingPage;

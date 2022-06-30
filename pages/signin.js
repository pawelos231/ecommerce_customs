import { getSession } from "next-auth/react";
import { getProviders, signIn } from "next-auth/react";
import styles from "../styles/LoginForm.module.sass";
//useless for now, will be needed in the future
function signin({ providers }) {
  console.log(providers);
  return (
    <div className={styles.container}>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default signin;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: providers,
    },
  };
}

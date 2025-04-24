import Input from "../components/input";

const Auth = () => {
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black/50 w-full h-full">
        <nav className="px-12 py-5">
            <img src="/images/logo.png" alt="" className="h-12" />
        </nav>
        <div className="flex justify-center">
            <div className="bg-black/70 mt-2 px-16 py-16 w-96 self-center lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-white text-4xl mb-8 font-semibold">
                    Sign In
                </h2>
                <div className="flex flex-col gap-4">
                    <Input />
                </div>
            </div>
        </div>

        </div>
    </div>
  );
}
export default Auth;
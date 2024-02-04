import { TextInput } from "@/components/ui/Forms";

const SingInSection = () => {
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                SIM
              </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <TextInput
                  id="email"
                  name="email"
                  htmlFor="email"
                  type="email"
                  label="Email"
                />
              </div>
              <div>
                <TextInput
                  id="email"
                  name="email"
                  htmlFor="email"
                  type="email"
                  label="Email"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <button type="submit" className="w-full border rounded-md h-8">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Não possui conta?
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-2"
                >
                  Cadastrar
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingInSection;

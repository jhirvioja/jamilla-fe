const LandingSignUpSheet = () => {
  return (
    <div className="p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="md:shrink-0"></div>
          <div className="p-8">
            <h1 className="text-2xl font-semibold italic text-center text-slate-900 dark:text-black">
              Viimeinen&nbsp;
              <span className="before:block before:absolute before:-inset-0.5 before:skew-y-2 before:bg-green-700 relative inline-block">
                <span className="relative text-white">reseptikirja-appi</span>
              </span>
              &nbsp;&nbsp;jonka tarvitset!
            </h1>
            <p className="mt-2 text-slate-500 text-center dark:text-black">
              Jamilla ei ole vain pelkästään reseptikirja-appi. Se ottaa huomioon kaiken kaupassa käymisestä itse kokkausprosessiin.
            </p>
            <div className="p-2"></div>
            <div className="uppercase tracking-wide text-sm text-green-700 font-semibold">Liity mukaan!</div>
            <div className="p-1"></div>
            <form id="signupsheet">
              <label className="block">
                <span className="block text-sm font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                  Käyttäjänimi
                </span>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500
              "
                />
                <div className="p-4"></div>
                <span className="block text-sm font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">Email</span>
                <input
                  type="email"
                  className="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
                <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">Tarkista antamasi tiedot</p>
                <span className="block text-sm font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                  Salasana
                </span>
                <input
                  className="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  id="password"
                  type="password"
                  placeholder="******************"
                ></input>
              </label>
              <div className="p-3"></div>
              <button className="bg-green-700 hover:bg-black p-4 pt-2 pb-2 text-white hover:text-white">Rekisteröidy</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingSignUpSheet

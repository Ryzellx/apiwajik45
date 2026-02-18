const appConfig: IAppConfig = {
  /**
   * server port
   */
  PORT: Number(process.env.PORT) || 3001,

  /**
   * domain frontend yang diizinkan untuk CORS
   * format env: FRONTEND_ORIGIN=https://app.example.com,https://www.example.com
   */
  FRONTEND_ORIGIN: String(process.env.FRONTEND_ORIGIN || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),

  /**
   * ngilangin properti sourceUrl di response
   *
   * jika true:
   *  {
   *    {...props}
   *    sourceUrl: "..."
   *  }
   *
   * jika false:
   *  {
   *    {...props}
   *  }
   */
  sourceUrl: true,
};

export default appConfig;

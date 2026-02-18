import otakudesuConfig from "@configs/otakudesu.config.js";
import getHTML from "@helpers/getHTML.js";
import { parse, type HTMLElement } from "node-html-parser";

const { baseUrl } = otakudesuConfig;

const otakudesuScraper = {
  async scrapeDOM(pathname: string, ref?: string, sanitize: boolean = false): Promise<HTMLElement> {
    const html = await getHTML(baseUrl, pathname, ref, sanitize);
    const document = parse(html, {
      parseNoneClosedTags: true,
    });

    return document;
  },

  async scrapeNonce(body: string, referer: string): Promise<{ data?: string }> {
    const nonceResponse = await fetch(new URL("/wp-admin/admin-ajax.php", baseUrl), {
      method: "POST",
      body,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Referer: referer,
        Origin: baseUrl,
      },
    });

    const nonce = (await nonceResponse.json()) as { data: string };

    return nonce;
  },

  async scrapeServer(body: string, referer: string): Promise<{ data?: string }> {
    const serverResponse = await fetch(new URL("/wp-admin/admin-ajax.php", baseUrl), {
      method: "POST",
      body,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: baseUrl,
        Referer: referer,
      },
    });

    const server = (await serverResponse.json()) as { data: string };

    return server;
  },
};

export default otakudesuScraper;

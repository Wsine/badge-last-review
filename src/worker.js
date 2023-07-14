/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
    const githubHost = 'https://api.github.com/repos';
    const pathname = new URL(request.url).pathname;
    const url = githubHost + pathname;
    console.log(url);

    const ghInit = {
      headers: {
        'User-Agent': 'curl/7.68.0',
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };
    if (env.GITHUB_TOKEN) {
      ghInit.headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
    }

    const ghResp = await fetch(url, ghInit)
      .then(resp => resp.json())
      .catch(error => console.error(error));

    async function parseTime(t, ...tArgs) {
      let date = new Date(t);
      for (const t of tArgs) {
        let d = new Date(t);
        date = date > d ? date : d;
      }
      return date.toISOString().split('T')[0];
    }

    const response = JSON.stringify({
      'created_at':  await parseTime(ghResp.created_at),
      'pushed_at':   await parseTime(ghResp.pushed_at),
      'updated_at':  await parseTime(ghResp.updated_at),
      'reviewed_at': await parseTime(
        ghResp.created_at, ghResp.pushed_at, ghResp.updated_at),
    });
    const init = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };

		return new Response(response, init);
	},
};

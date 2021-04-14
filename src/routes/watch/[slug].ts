/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get({ params }) {
    const { slug } = params;

    const redir = () =>
    {
        return {
            redirect: {
                status: 302,
                to: "https://yt-thumbnail-replacer.vercel.app/",
            },
        };
    }

    if(!slug) return redir();
    if(!slug.includes('-')) return redir();

    const invalid = ['<', '>', '"', "'", '?', '&', '='];
    const split = slug.split('-');

    let vidID = split[0];
    for (let i = 0; i < invalid.length; i++) 
    {
        vidID = vidID.replace(invalid[i], '');
    }

    let image;

    try 
    {
        image = Buffer.from(split[1], 'base64').toString();
    } catch (error) 
    {
        return redir();
    }

    if(!image) return redir();

    image = image.replace('"', '');

    const text = `      
<!DOCTYPE html>
<head>
<meta property="og:type" content="video.other" />
<meta
property="twitter:player"
content="https://www.youtube.com/embed/${vidID}"
/>
<meta property="og:video:type" content="text/html" />
<meta property="og:video:width" content="900" />
<meta property="og:video:height" content="506" />
<meta
name="twitter:image"
content="${image}"
/>
<meta
http-equiv="refresh"
content="0;url=/"
/>
</head>
    `;

    return {
        headers: {
            'Content-Type': 'text/html; charset=UTF-8'
        },

        body: text
    };
}
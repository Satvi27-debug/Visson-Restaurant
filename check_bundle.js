const https = require('https');
https.get('https://visson-restaurant-r7fk.vercel.app/', (r) => {
  let html = '';
  r.on('data', d => html+=d);
  r.on('end', () => {
    const m = html.match(/src="(\/assets\/index-.*?\.js)"/);
    if(m) {
      https.get('https://visson-restaurant-r7fk.vercel.app' + m[1], (r2) => {
        let js = '';
        r2.on('data', d => js+=d);
        r2.on('end', () => {
          console.log('Contains localhost:', js.includes('localhost:5000'));
          console.log('Contains visson-restaurant.vercel.app:', js.includes('visson-restaurant.vercel.app'));
          const apiMatch = js.match(/baseURL:\s*"([^"]+)"/);
          if (apiMatch) console.log('Found baseURL?', apiMatch[1]);
          else {
            // Vite injects environment variables like "https://visson-restaurant.vercel.app/api"
            // Let's just find any occurrence of vercel.app in the file
            const urlMatch = js.match(/https:\/\/visson-restaurant[a-zA-Z0-9-]*\.vercel\.app\/?[a-zA-Z0-9/]*/g);
            console.log('Found URLs:', Array.from(new Set(urlMatch)));
          }
        });
      });
    }
  });
});
